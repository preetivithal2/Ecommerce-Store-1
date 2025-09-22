
// 1. Get references to the HTML elements
const categoryButtons = document.querySelectorAll('.category-buttons button');
const cardContainer = document.querySelector('.card-container');

// Modal elements
const modal = document.getElementById('buyModal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalPrice = document.getElementById('modal-price');
const modalDetails = document.getElementById('modal-details');
const closeButton = document.querySelector('.close-button');

// 2. Function to fetch data and display cards
const displayCards = async (category) => {
  try {
    const response = await fetch("json/new arrivals.json");
    const data = await response.json();

    cardContainer.innerHTML = '';
    const items = data[category];

    if (items) {
      items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Added "Buy Now" button to the card's inner HTML
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.price}</p>
          <button class="buy-now-button bg-warning w-75 d-flex justify-content-center" style="border:none; ">Buy Now</button>
        `;

        // Add an event listener to the newly created "Buy Now" button
        const buyNowButton = card.querySelector('.buy-now-button');
        buyNowButton.addEventListener('click', () => {
          // Open the modal and populate it with item data
          openModal(item);
        });

        cardContainer.appendChild(card);
      });
    } else {
      cardContainer.innerHTML = '<p>No items found for this category.</p>';
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    cardContainer.innerHTML = '<p>Error loading content. Please try again later.</p>';
  }
};

// 3. Function to open and populate the modal
const openModal = (item) => {
  modalTitle.textContent = item.name;
  modalImage.src = item.image;
  modalImage.alt = item.name;
  modalPrice.textContent = item.price;
  modalDetails.textContent = `This is a great ${item.name.toLowerCase()}! It's perfect for any occasion.`; // A simple detail line
  modal.style.display = 'block'; // Show the modal
};

// 4. Add event listeners to close the modal
closeButton.addEventListener('click', () => {
  modal.style.display = 'none'; // Hide the modal
});

// Close the modal if the user clicks anywhere outside of it
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// 5. Optionally, display an initial category when the page loads
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    displayCards(category);
  });
});

// Display the "dresses" category on initial load
displayCards('Just For You!');