async function fetchCoffeeData(){
    try{
        const response = await fetch('https://api.sampleapis.com/coffee/hot');
  
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    displayCoffeeData(data);
}
  catch(error){
    console.error('An error occurred:', error);
  }
}

//function display coffee data
function displayCoffeeData(coffees){
    const coffeeList = document.getElementById('coffee-list');
    if(coffees.length === 0){
        coffeeList.innerHTML = '<li>No Coffee data available</li>';
    }else {
    coffees.forEach(coffee =>{
        const listItem = document.createElement('li');
        listItem.textContent = coffee.title;
        coffeeList.appendChild(listItem);
    });
}
}
window.onload=fetchCoffeeData;