async function fetchHotCoffeeData() {
  try {
    const response = await fetch("https://api.sampleapis.com/coffee/hot");

    if (!response.ok) {
      throw new Error(`Hot coffee request failed: ${response.statusText}`);
    }
    const data = await response.json();
    displayCoffeeData(data, "hot");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function fetchIcedCoffeeData() {
  try {
    const response = await fetch("https://api.sampleapis.com/coffee/iced");

    if (!response.ok) {
      throw new Error(`Iced coffee request failed: ${response.statusText}`);
    }
    const data = await response.json();
    displayCoffeeData(data, "iced");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function displayCoffeeData(coffees, type) {
  const coffeeList = document.getElementById(`${type}-coffee-list`);
  coffeeList.innerHTML = ""; // Clear previous data

  if (coffees.length === 0) {
    coffeeList.innerHTML = "<li>No coffee data available</li>";
  } else {
    coffees.forEach((coffee) => {
      const listItem = document.createElement("li");
      listItem.classList.add("coffee-item");

      const coffeeImage = document.createElement("img");
      coffeeImage.src = coffee.image || "path/to/placeholder-image.jpg"; // Placeholder image
      coffeeImage.alt = coffee.title || "Coffee Image";
      coffeeImage.onerror = () =>
        (coffeeImage.src = "path/to/placeholder-image.jpg"); // Handle image load errors

      const coffeeContent = document.createElement("div");
      coffeeContent.classList.add("coffee-content");

      const coffeeTitle = document.createElement("p");
      coffeeTitle.classList.add("coffee-title");
      coffeeTitle.textContent = coffee.title || "Unknown Title";

      const coffeeDetails = document.createElement("div");
      coffeeDetails.classList.add("coffee-details");
      coffeeDetails.innerHTML = `
              <p><strong>${coffee.title || "Unknown Title"}</strong></p>
              <p>${coffee.description || "No description available"}</p>
          `;

      coffeeContent.appendChild(coffeeTitle);
      coffeeContent.appendChild(coffeeDetails);

      listItem.appendChild(coffeeImage);
      listItem.appendChild(coffeeContent);

      listItem.addEventListener("click", () => {
        coffeeDetails.classList.toggle("show"); // Toggle details visibility
        listItem.classList.toggle("active"); // Toggle active state
      });

      coffeeList.appendChild(listItem);
    });
  }
}

window.onload = () => {
  fetchHotCoffeeData();
  fetchIcedCoffeeData();
};

document.addEventListener("DOMContentLoaded", () => {
  const hotCoffeeBtn = document.getElementById("hot-coffee-btn");
  const icedCoffeeBtn = document.getElementById("iced-coffee-btn");
  const hotCoffeeScreen = document.getElementById("hot-coffee-screen");
  const icedCoffeeScreen = document.getElementById("iced-coffee-screen");
  const selectionScreen = document.getElementById("selection-screen");

  hotCoffeeBtn.addEventListener("click", () => {
    selectionScreen.style.display = "none";
    hotCoffeeScreen.style.display = "block";
    fetchHotCoffeeData(); // Fetch data when screen is displayed
  });

  icedCoffeeBtn.addEventListener("click", () => {
    selectionScreen.style.display = "none";
    icedCoffeeScreen.style.display = "block";
    fetchIcedCoffeeData(); // Fetch data when screen is displayed
  });

  document.getElementById("back-to-selection").addEventListener("click", () => {
    hotCoffeeScreen.style.display = "none";
    selectionScreen.style.display = "block";
  });

  document
    .getElementById("back-to-selection-iced")
    .addEventListener("click", () => {
      icedCoffeeScreen.style.display = "none";
      selectionScreen.style.display = "block";
    });
});
