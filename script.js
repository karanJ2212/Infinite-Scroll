const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
// image load function, check if images are loaded
// imagesLoded is a variable that is 0 in begining, and inc as number of images,
//we will get total images from photoArray.length,
//so now total image = ttotal length, then only reload will happen
//ready is bolean for that

const imageLoaded = () => {
  console.log("images have been loaded");
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready images =", imagesLoaded, ready);
  }
};

let photosArray = [];

// unsplash API
const count = 30;
const query = "sexy";
const apiKey = "Aj7jZPd8DEUtoiQvN1owREh4ydBSGIP5S5Eq0xnhyb8";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=${query}`;

// helper funtion to set attributes on DM elements

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// create elements for links and photos, add to DOM ---DISPLAY PHOTOS

const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total image: ", totalImages);
  //run functin for each object in phootoarrya

  photosArray.forEach((photo) => {
    // create <a> to link to unsplash

    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "blank",
    });
    //create image

    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //event liastner check time to load 1 image

    img.addEventListener("load", imageLoaded);

    //put <img> inside the <a> element, and put bothh inside img-container element

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

const fetchPhotos = async () => {
  try {
    const resposnse = await fetch(apiURL);
    photosArray = await resposnse.json();

    displayPhotos();
  } catch (error) {
    //catch error here
  }
};

// check to see if scrollong newr bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    fetchPhotos();
    console.log("scroll event ready=", ready);
  }
});
// on load
fetchPhotos();
