function handleClick(ramen) {
  document.querySelector("#ramen-detail .detail-image").src = ramen.image;
  document.querySelector("#ramen-detail .name").textContent = ramen.name;
  document.querySelector("#ramen-detail .restaurant").textContent = ramen.restaurant;
  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
}

function displayRamens() {
  fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
          const ramenMenuDiv = document.getElementById('ramen-menu');
          ramenMenuDiv.innerHTML = '';
          ramens.forEach(addRamenToMenu);

          if (ramens.length > 0) {
              handleClick(ramens[0]);
          }
      });
}

function addSubmitListener() {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);

      const newRamen = {
          name: formData.get('name'),
          restaurant: formData.get('restaurant'),
          image: formData.get('image'),
          rating: formData.get('rating'),
          comment: formData.get('new-comment'),
      };

      addRamenToMenu(newRamen);
      form.reset();
  });
}

function addRamenToMenu(ramen) {
  const img = document.createElement('img');
  img.src = ramen.image;  // This must be a correct URL
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  document.getElementById('ramen-menu').appendChild(img);
}

function main() {
  displayRamens();
  addSubmitListener();
}

main();









// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
