
const APP_ID = "59790c35";
const APP_key = "0f93369a73be9ea88567f7f8a93714ef";

const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.searchResult');

let searchQuery = "";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI() {
    const appURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=30`;
    const response = await fetch(appURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
            `<div class="card p-4 item col-lg-3 mt-5">
            <img class="card-img-top" src="${result.recipe.image}" alt="">
            <div class="card-body">
            <div class="d-flex">
                <h6 class="title">${result.recipe.label}</h6>
                <a class="btn btn-sm btn-dark" target="_blank" href="${result.recipe.url}">
                View Recipe
                </a>
            </div>
            <p class="card-text">Calories : ${result.recipe.calories.toFixed(2)}</p>
            <p class="card-text">Diet : ${result.recipe.dietLabels > 0 ? result.recipe.dietLabels: 'No Data Found'}</p>
            <p class="card-text">Health Label : ${result.recipe.healthLabels[0]}</p>
            </div>
        </div>`
    })

    searchResultDiv.innerHTML = generatedHTML;

    // Add hover effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = 'none';
        });
    });
}