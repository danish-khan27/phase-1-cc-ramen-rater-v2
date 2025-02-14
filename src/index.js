
// Callbacks
let handleClick = (ramen) => {
  // Add code
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  // Update ramen details
  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

let addSubmitListener = () => {
  // Add code
 const form = document.getElementById('new-ramen');
  
 form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newRamen = {
    name: event.target.name.value,
    restaurant: event.target.restaurant.value,
    image: event.target.image.value,
    rating: event.target.rating.value,
    comment: event.target.comment.value,
  };
  // Append the new ramen
  const img = document.createElement('img');
  img.src = newRamen.image;
  img.alt = newRamen.name;
  img.addEventListener('click', () => handleClick(newRamen));
  document.getElementById('ramen-menu').appendChild(img);
  form.reset();
});
};



function displayRamens() {
  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((ramens) => {
      let ramenMenuDiv = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        document.getElementById('ramen-menu').appendChild(img);
      });

      // Display the details of the first ramen by default
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch((error) => console.error('Error fetching ramens:', error));
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRamen),
    })
    .then(response => response.json())
    .then(data => console.log('New ramen added:', data))
    .catch(error => console.error('Error adding ramen:', error));
};


let main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  addSubmitListener();
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
