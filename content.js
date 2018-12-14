// content.js

// get all images
var allImages = $('img');

var regex = /\/full\/[\!0-9]*,[\!0-9]*\/\d*\/.*\.jpg/;

// loop over images and check for iiif pattern in src
$.each( allImages, function( index, image ){
    
    var src = $(image).attr('src')
    
    if (src.match(regex)) {

        // replace
        var infoJSON = src.replace(regex, "/info.json");

        // we found one we need to add a button
        $(image).wrap( "<a href='http://slowlooking.cogapp.com/?image=" + infoJSON + "'></a>" );
    }

});



// var destination = $('.emoticon-button').offset();
// $('#icon-selection-menu').css({top: destination.top, left: destination.left});