// content.js

// get all images
var allImages = $('img');

var regex = /\/full\/[\!0-9]*,[\!0-9]*\/\d*\/.*\.jpg/;
var iconPNG = chrome.extension.getURL("images/snail32.png");
var iconSVG = chrome.extension.getURL("images/snail.svg");

// loop over images and check for iiif pattern in src
$.each( allImages, function( index, image ){
    
    var src = $(image).attr('src')
    
    if (src.match(regex)) {

        // replace with info json
        var infoJSON = src.replace(regex, "/info.json");

        // is parent an 'a' tag?
        var parent = $(image).parent();

        // add the link to the DOM
        if($(parent).is("a")) {

            $(parent).after("<a href='http://slowlooking.cogapp.com/?image=" + infoJSON + "'><img src='" + iconPNG + "' /></a>");
        }
        else {
            
            $(image).after("<a href='http://slowlooking.cogapp.com/?image=" + infoJSON + "'><img src='" + iconPNG + "' /></a>");
        }

    }

});
