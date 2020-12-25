const container = document.getElementById('image-container');
const loader = document.getElementById('loader');
const scrollUp = document.getElementById('scrollUp');
let images = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 10;
const apiKey = 'iTtU8mZbyuWi-HNpc-f26CQLXDr0TcDAel3mXy4TtIM';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Helper function to set attributes
function setAttributes(elem, atts){
    for ( const key in atts ){
        elem.setAttribute(key, atts[key]);
    }
}
//Helper function to check if image was loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages ){
        ready = true;
        loader.hidden = true;
    }
}
//Create the image elements

function displayPhotos(){
    loader.hidden = false;
    scrollUp.hidden = true;
    imagesLoaded = 0;
    totalImages = images.length;
    console.log('Total Images = '+ totalImages);
    images.forEach( (image) => {
        //Create a item
       const item = document.createElement('a');
        //Simple assign atts
       // item.setAttribute('href', image.links.html);
       // item.setAttribute('target', '_blank');
        //Programmatically setAttribute using the helper function
        setAttributes(item, {
            href:image.links.html,
            target: '_blank',
        })
       //Create the image item
       const photo = document.createElement('img');
        //Simple assign atts
       // photo.setAttribute('src', image.urls.regular);
       // photo.setAttribute('alt', image.alt_description);
       // photo.setAttribute('title', image.alt_description);

        //Programmatically setAttribute using the helper function
        setAttributes( photo,{
            src:image.urls.regular,
            alt:image.alt_description,
            title:image.alt_description,
        });
        //Check when each call is finished loading
        photo.addEventListener('load', imageLoaded);
        //add elements to the DOM
       item.appendChild(photo);
       container.appendChild(item);

    });

}
//Get Photos form the API
async function getPhotos(){
    try {
        const res = await fetch( apiUrl );
        images = await res.json();
        displayPhotos();
    } catch ( err ){
        console.warn(err);
    }
}

//Check to see if we are close to document bottom
window.addEventListener('scroll', ()=>{
   if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ){
       ready = false;
       getPhotos();
   }
   if ( window.innerHeight + window.scrollY >= 450 ){
       scrollUp.hidden = false;
   } else {
       scrollUp.hidden = true;
   }
//scroll up functionality
    scrollUp.addEventListener('click', ()=>{
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
        window.scroll({top: 0, behavior: "smooth"});
    })
});

getPhotos();