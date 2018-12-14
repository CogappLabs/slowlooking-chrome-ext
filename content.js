// content.js

// get all images and their src
// var allImages = $('img').map(function(){
//     return $(this).attr('src')
// }).get()

// var regex = /\/full\/[\!0-9]*,[\!0-9]*\/\d*\/.*\.jpg/;
// // loop over images and check for iiif pattern in src
// $.each( allImages, function( index, src ){
  
//     if (src.match(regex)) {
//         console.log('Woo we have a IIIF image: ' + src);

//         // we found one we need to add a button
//     }
// });


// get all images
var allImages = $('img');

var regex = /\/full\/[\!0-9]*,[\!0-9]*\/\d*\/.*\.jpg/;

// loop over images and check for iiif pattern in src
$.each( allImages, function( index, image ){
    var src = $(image).attr('src')
    
    if (src.match(regex)) {
        console.log('Woo we have a IIIF image: ' + src);

        // we found one we need to add a button
    }
    else {
        console.log('BOO: ' + src);

    }
});

