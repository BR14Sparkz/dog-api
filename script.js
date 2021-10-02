/*** API ***/
// get all breeds from api
async function getDogData() {
  let url = 'https://dog.ceo/api/breeds/list/all';
  
  try {
    const response = await fetch(url);
    const dogData = await response.json();
  
    // send the data to the list
    renderDogsList(dogData.message);
  
  } catch (error) {
      console.log(error);
  }
}

// Breed list render fuction
function renderDogsList(dogs) {
  let html = '';
  let dogList = document.querySelector('.dog-list');

  // for each key in the object, add key value as list item
  for (const dog of Object.keys(dogs)) {
    let htmlContent = `<li onclick="updateDogGallery(this.textContent)">${dog}</li>`;
    html += htmlContent;
  }
  
  // add to dom
  dogList.innerHTML = html;
}

async function updateDogGallery(dog) {
  var imageUrl = '';

  // check if a breed has been selected
  if (dog){
    // if true fetch images for breed
    imageUrl = `https://dog.ceo/api/breed/${dog}/images/random/15`;
  } else {
    // if false fetch random images
    imageUrl = 'https://dog.ceo/api/breeds/image/random/15';
  }

  try {
    const response = await fetch(imageUrl);
    const data = await response.json();
    
    // update the gallery images
    renderDogImages(data.message);

  } catch (error) {
    console.log(error);
  }
}


function renderDogImages(dogImages) {
  let html = '';
  let dogGallery = document.querySelector('.dog-gallery');

  // for each value in the object, add the value(url) as an image
  for (const img of Object.values(dogImages)) {
    let htmlContent = `<picture><img src="${img}" loading="lazy"/></picture>`;
    html += htmlContent;
  }

  // add to dom
  dogGallery.innerHTML = html;
}

getDogData()
updateDogGallery()