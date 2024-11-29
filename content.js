// content.js
const ATTRIBUTE_CHECKS = ['src', 'srcset', 'data-srcset'];
const IIIF_REGEX = /\/full\/[\!0-9]*,[\!0-9]*\/\d*\/.*\.jpg/;

async function initialize() {
  try {
    const { display_mode: extensionMode } = await chrome.storage.sync.get('display_mode');
    if (extensionMode === 'disabled') return;

    const iiifImages = findIIIFImages();
    await addIIIFIcons(iiifImages, extensionMode);
  } catch (error) {
    console.error('Failed to initialize:', error);
  }
}

function findIIIFImages() {
  const images = Array.from(document.querySelectorAll('img'));
  const iiifImages = [];

  function checkForIIIFUrl(url) {
    return url && url.match(IIIF_REGEX);
  }

  function extractUrlsFromSrcset(srcset) {
    if (!srcset) return [];
    return srcset
      .split(', ')
      .map((src) => src.trim().split(' ')[0])
      .filter(checkForIIIFUrl);
  }

  images.forEach((image) => {
    for (const attr of ATTRIBUTE_CHECKS) {
      if (attr === 'src' && checkForIIIFUrl(image.src)) {
        iiifImages.push({ element: image, url: image.src });
        break;
      } else {
        const srcsetValue = image.getAttribute(attr);
        const iiifUrls = extractUrlsFromSrcset(srcsetValue);
        if (iiifUrls.length > 0) {
          iiifImages.push({ element: image, url: iiifUrls[0] });
          break;
        }
      }
    }
  });

  return iiifImages;
}

async function addIIIFIcons(iiifImages, extensionMode) {
  const icon = chrome.runtime.getURL('images/eye.svg');

  await Promise.all(
    iiifImages.map(async ({ element, url }, index) => {
      const infoJSON = url.replace(IIIF_REGEX, '/info.json');
      const parent = element.parentElement;
      const slowLookingLink = await createSlowLookingLink(infoJSON, icon, index);

      parent.style.position = 'relative';
      parent.appendChild(slowLookingLink);

      if (extensionMode === 'unobtrusive') {
        setupUnobtrusiveMode(element, slowLookingLink);
      }
    })
  );
}

async function createSlowLookingLink(infoJSON, iconUrl, index) {
  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'closed' });

  const link = document.createElement('a');
  link.setAttribute('data-extension', 'slow-looking');
  link.id = `slowlookinglink_${index}`;
  link.className = 'slow-looking-link';
  link.href = `http://slowlooking.cogapp.com/?image=${infoJSON}`;
  link.target = '_blank';
  link.setAttribute('aria-label', 'View image with Slow Looking');

  try {
    const response = await fetch(iconUrl);
    const svgContent = await response.text();

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'icon-wrapper';

    iconWrapper.innerHTML = svgContent.trim();
    const svg = iconWrapper.querySelector('svg');
    svg.classList = 'icon-svg';

    link.appendChild(iconWrapper);
  } catch (error) {
    console.error('Failed to load SVG:', error);
  }

  // Add styles to shadow DOM
  const style = document.createElement('style');
  style.textContent = `
    :host {
      all: initial;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
    }

    .slow-looking-link {
      fill: #000;
    }

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 4px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    }
  `;

  shadow.appendChild(style);
  shadow.appendChild(link);

  return host;
}

function setupUnobtrusiveMode(image, link) {
  link.style.display = 'none';

  const showLink = () => (link.style.display = 'inline');
  const hideLink = () => (link.style.display = 'none');

  // Add mouse enter/leave listeners
  [image, link].forEach((element) => {
    element.addEventListener('mouseenter', showLink);
    element.addEventListener('mouseleave', hideLink);
  });
}

window.addEventListener('load', () => {
  initialize();
});
