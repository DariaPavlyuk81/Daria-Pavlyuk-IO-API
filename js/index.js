async function fetchHotCoffeeData(){
    try{
        const response = await fetch('https://api.sampleapis.com/coffee/hot');
  
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    displayCoffeeData(data, 'hot');
}
  catch(error){
    console.error('An error occurred:', error);
  }
}


async function fetchIcedCoffeeData(){
  try {
      const response = await fetch('https://api.sampleapis.com/coffee/iced');

  if (!response.ok) {
    throw new Error('Request failed');
  }
  const data = await response.json();
  displayCoffeeData(data,'iced');
}
catch(error){
  console.error('An error occurred:', error);
}
}
//function display coffee data
function displayCoffeeData(coffees,type){
    const coffeeList = document.getElementById(`${type}-coffee-list`);
    //clear previous data
    coffeeList.innerHTML ='';

    if(coffees.length === 0){
      coffeeList.innerHTML = '<li>No coffee data available</li>';

    }else {
      coffees.forEach(coffee => {
        const listItem  = document.createElement('li');
        listItem.textContent = coffee.title;
        listItem.dataset.coffeeId = coffee.id; // Add a data attribute for the coffee ID
            listItem.addEventListener('click', () => showCoffeeDetails(coffee));
        coffeeList.appendChild(listItem);
      });
    }
  }
  function showCoffeeDetails(coffee) {
    const detailsContainer = document.getElementById('coffee-details');
    const coffeeName = document.getElementById('coffee-name');
    const coffeeDescription = document.getElementById('coffee-description');
    const doneButton = document.getElementById('done-button');
    coffeeName.textContent = coffee.title;
    coffeeDescription.textContent = coffee.description || 'No description available';
    detailsContainer.style.display = 'block'; // Make sure the details container is visible
    doneButton.style.display = 'block'; // Show the Done button
}

document.getElementById('done-button').addEventListener('click', () => {
  const detailsContainer = document.getElementById('coffee-details');
  const doneButton = document.getElementById('done-button');

  detailsContainer.style.display = 'none'; // Hide the details container
  doneButton.style.display = 'none'; // Hide the done button

});

  window.onload = () => {
    fetchHotCoffeeData();
    fetchIcedCoffeeData();
  };




     
  
       