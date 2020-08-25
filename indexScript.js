let spotlightRecipes = [];

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

loadRecipes()


headerExpand = document.querySelector('.navbar-toggler-icon');
headerExpand.addEventListener('click', function() {
    changeHeaderHeight()
    })


}

function changeHeaderHeight() {
    document.getElementsByClassName("top-nav")[0].style.height = "auto"
}

function loadRecipes() {
    loadData("spotlight.json");
}

function loadData(jsonFile) {
    var json = new XMLHttpRequest();
    json.open("GET", jsonFile, true);
    json.send();
    json.onload = function () {
        if (json.readyState === 4 && json.status == 200) {  
            data = JSON.parse(json.responseText);
            storeRecipesLocally(data);
            console.log(spotlightRecipes)
            populateRecipeCards(spotlightRecipes);
            postRecipeCards();
        }
    }
}

function storeRecipesLocally(data) {
    spotlightRecipes = data.spotlightRecipes 
}

function populateRecipeCards(list) {
    console.log(list[0].type)
    recipeCard = [];
    list.forEach(function (item) {
        recipeCard.push(`<div class="spotlight-wrapper-index shadow">
        <div>
          <img class="spotlight-picture" src="${item.picture}"" alt="">
        </div>

        <div class="spotlight-description">
          <div class="spotlight-text-container">
          <h3 class="spotlight-description-title">${item.name}<p class="lead ml-3 cap">${item.type}</p></h3>
          <p class="spotlight-description-text">"${item.description}"</p>
          </div>

          <div class="spotlight-btn-container">
            <button class="spotlight-btn btn btn-primary" type="button">Recipe</button>
            <button class="spotlight-btn btn btn-primary" type="button">Add</button>
          </div>
        </div>

      </div>`)
    }) 
}

function postRecipeCards() {
    document.querySelector('#spotlight').innerHTML = ''
    recipeCard.forEach(function (e) {
        document.querySelector('#spotlight').innerHTML += e;
    })
}
