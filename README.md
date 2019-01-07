# Slow looking Chrome extension
This is the repository for the "slow looking" Chrome extension. It allows you to slow look any IIIF-served image visible on any website by adding a clickable 'eye' icon next to each image. Clicking on that will take you to [Cogapp's slow looking website](http://slowlooking.cogapp.com/) with the relevant image already loaded.

If you want to install and run the latest stable version of the extension, please visit the [slow looking extension page on the Chrome store](https://chrome.google.com/webstore/detail/slow-looking/ofekjfeobgpjgklnmpdafpinjnbblbbj). 

To run the development version, or to modify it yourself, proceed as follows:

0. Checkout the `development` branch to a local directory
1. Open the Extension Management page by navigating to (<chrome://extensions>) or by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the LOAD UNPACKED button and select the extension directory that you just checked out.

## Feature requests or bug reports

Please [log an issue](https://github.com/Cogapp/slowlooking-chrome-ext/issues) or email [slowlooking@cogapp.com](mailto:slowlooking@cogapp.com). Alternatively, just update the code and contribute a pull request (see "Contributing" below).

## TODO

Here's a list of things that are on our road-map:

1. Make it work with embedded Openseadragon viewers
2. Better handling of Javascript-rendered pages
3. Better placement and icons (SVG)

## Sample sites

Here's a list of sites that are known to work (or not), with sample pages to visit:

### Fully working

- [Qatar Digital Library](https://www.qdl.qa/en/search/site/?f[0]=document_source:archive_source)
- [Endangered Archives Programme](https://eap.bl.uk/search/site?f%5B0%5D=ss_simplified_type%3AItem)

### Partially working

- [Chester Beatty](https://viewer.cbl.ie/viewer/browse/-/1/SORT_TITLE/DC:arabiccollection/) - _we mangle the DOM and hyperlink on the image instead of unser it_

### Not working

- [Biblissima](https://iiif.biblissima.fr/collections/search?collection=Biblioth%C3%A8que%20nationale%20de%20France%20(Gallica)) - _no IIIF thumbnails_


## Contributing

1. Fork it (<https://github.com/Cogapp/slowlooking-chrome-ext/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request