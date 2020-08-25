/*--Declare global variables--*/
var recipes = [];
var updatedRecipes = [];
var recipeCard = [];
var selectedMeals = [];
var nameInput = document.querySelector('#nameRefine')
var nameBtn = document.querySelector("#nameRefineBtn")
var ingredientAddBtn = document.querySelector("#ingredientAddBtn")
var ingredientInputs = document.querySelectorAll('.ingredient-input')
var ingredientRemoveBtn = document.querySelector("#ingredientRemoveBtn")
var mealInput = document.querySelectorAll('.mealCheckbox')
var resetBtn = document.querySelector("#resetBtn")
var searchTab = false;
var filterTab = false;


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    /*--Get data.json info, parse, and post recipe list--*/
    loadRecipes();

    

/*------Add event listeners------*/
headerExpand = document.querySelector('.navbar-toggler-icon');
headerExpand.addEventListener('click', function() {
    changeHeaderHeight()
})

ingredientAddBtn.addEventListener("click", function(){
    addIngredientInput()
})

ingredientRemoveBtn.addEventListener("click", function(){
    removeIngredientInput()
})

ingredientClearBtn.addEventListener("click", function(){
    clearIngredientInput()
})

filterRefineBtn.addEventListener("click", function() {
    ingredientFilter()
}) 

resetBtn.addEventListener("click", reset)

    /*--Test the value of the box by btn--*/
    
    /* nameBtn.addEventListener("click", function(){
        nameFilter(nameInput.value)
    }) 
     */
    
}

function changeHeaderHeight() {
    document.getElementsByClassName("top-nav")[0].style.height = "auto"
}

function loadRecipes() {
    loadData("yourRecipes.json");
}

function loadData(jsonFile) {
    var json = new XMLHttpRequest();
    json.open("GET", jsonFile, true);
    json.send();
    json.onload = function () {
        if (json.readyState === 4 && json.status == 200) {  
            data = JSON.parse(json.responseText);
            storeRecipesLocally(data);
            populateRecipeCards(recipes);
            postRecipeCards();
            cardListener(recipes);
        }
    }
}

function storeRecipesLocally(data) {
    recipes = data.recipes 
}

function populateRecipeCards(list) {
    recipeCard = [];
    list.forEach(function (item) {
        recipeCard.push(`<div class="spotlight-wrapper shadow">
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
    document.querySelector('.recipe-list').innerHTML = ''
    recipeCard.forEach(function (e) {
        document.querySelector('.recipe-list').innerHTML += e;
    })
}

function nameFilter(dishName) {
    if(dishName == '') {
        
    }else {
        updatedRecipes = recipes.filter(function(e) {
            return e.name.toLowerCase() === dishName.toLowerCase();
        })
        updateLocalRecipes(updatedRecipes)
        populateRecipeCards(updatedRecipes)
        postRecipeCards()
        cardListener(updatedRecipes)
    } 
}

function ingredientFilter() {

    if(document.querySelector("#and").checked == true) {
        ingredientAndFilter()
    } else if(document.querySelector("#or").checked == true) {
        ingredientOrFilter()
    }
}

function ingredientAndFilter() {
    let ingredientInputs = document.querySelectorAll('.ingredient-input')
    let ingredientInputDiv = document.querySelectorAll('.ingredient-input-div')
    let ingredientList = document.querySelector(".ingredient-refine-list");
    let updatedRecipesOR = [];
    let updatedRecipesAnd = [];

    for(let i=0; i<ingredientInputDiv.length; i++){
        if(ingredientInputDiv[i].firstChild.value == '') {
            ingredientInputDiv[i].remove();
        }
    }

    if(ingredientList.childElementCount == 0) {
        let addInput = `<div class="ingredient-input-div"><input type="text" class="form-control ingredient-input" placeholder="Ingredient"></div>`
        ingredientList.insertAdjacentHTML('beforeend', addInput)
    }

    ingredientInputs.forEach(function(e) {

        if(e.value == '') {

        }else if(updatedRecipesOR.length > 0)  {
            updatedRecipesOR = updatedRecipesOR.filter(function(x) {
                for(let j=0; j<x.ingredients.length; j++) {
                    if(x.ingredients[j].toLowerCase() == e.value.toLowerCase()){
                        return x
                    }
                }
            }) 
            console.log(updatedRecipesOR.length)
            updatedRecipesAnd = updatedRecipesOR.filter(function(x) {
                for(let j=0; j<x.ingredients.length; j++) {
                    if(x.ingredients[j].toLowerCase() == e.value.toLowerCase()){
                        return x
                    }
                }
            })      
        } else {
            updatedRecipesOR = recipes.filter(function(x) {
                for(let j=0; j<x.ingredients.length; j++) {
                    if(x.ingredients[j].toLowerCase() == e.value.toLowerCase()){
                        return x
                    }
                }
            }) 
            updatedRecipesAnd = updatedRecipesOR.filter(function(x) {
                for(let j=0; j<x.ingredients.length; j++) {
                    if(x.ingredients[j].toLowerCase() == e.value.toLowerCase()){
                        return x
                    }
                }
            })
        }
    })
    
    if(updatedRecipesOR.length == 0 && ingredientInputs[0].value !== '') {
        mealFilter(updatedRecipesAnd)
    } else if(updatedRecipesOR.length == 0) {
        mealFilter(recipes)
    } else {
        mealFilter(updatedRecipesAnd)
    }



    if(document.querySelector(".recipe-list").innerHTML == '') {
        document.querySelector(".recipe-list").innerHTML = `Sorry, there are no recipes that match this description`
    }
} 

function ingredientOrFilter() {
    var ingredientInputs = document.querySelectorAll('.ingredient-input')
    updatedRecipes = [];
    ingredientInputs.forEach(function(e) {

        if(e.value == '') {

        }else {
            for(let i=0; i<recipes.length; i++){
                for(let j=0; j<recipes[i].ingredients.length; j++) {
                    if(recipes[i].ingredients[j].toLowerCase() == e.value.toLowerCase()){
                        updatedRecipes.push(recipes[i]);
                    }
                }
            }    
        } 
    })
    if(updatedRecipes.length == 0) {
        mealFilter(recipes)
    } else {
        mealFilter(updatedRecipes)
    }
}

function mealFilter(list) {
    let unique;
    updatedRecipes = [];
    document.querySelectorAll('.ingredient-input').forEach(function(e) {
        if(mealInput[0].checked == false && mealInput[1].checked == false && mealInput[2].checked == false) {
            unique = [...new Set(list)];
            
        } else {
            mealboxParse(mealInput).forEach(function(e) {
                let filtered = list.filter(function(x) {
                    return e.name.toLowerCase() === x.name.toLowerCase()
                })
                updatedRecipes.push(...filtered)
            })
            unique = [...new Set(updatedRecipes)];
        } 
    })
    updateLocalRecipes(unique)
    populateRecipeCards(unique)
    postRecipeCards() 
    cardListener(unique)
}

function mealboxParse(mealInput) {
    selectedMeals = [];
    let filteredDishes= [];
    mealInput.forEach(function(e) {
        if(e.checked === true)
        selectedMeals.push(e.name)
    })

    selectedMeals.forEach(function(e) {
        filteredDishes.push(recipes.filter(function(x) {
            return e == x.type
        }))
    })

    filteredDishes.forEach(function(e) {
        filteredDishes.push(...e)
    })

    for(let i=0; i<selectedMeals.length; i++){
        filteredDishes.shift()
    }

    return filteredDishes
}

function updateLocalRecipes(updatedRecipeList) {
    updatedRecipes = updatedRecipeList;
}

function reset() {
    nameInput.value = '';
    document.querySelector(".ingredient-refine-list").innerHTML = `
    <div class="ingredient-input-div"><input type="text" class="form-control ingredient-input" placeholder="Ingredient"></div>`
    ingredientInputs.forEach(function(e) {
        e.value = ''
    });
    mealInput.forEach(function(e) {
        e.checked = false;
    })
    loadRecipes()
}

function addIngredientInput() {
    let ingredientList = document.querySelector(".ingredient-refine-list");
    let addInput = `<div class="ingredient-input-div"><input type="text" class="form-control ingredient-input" placeholder="Ingredient"></div>`
    if(ingredientList.childElementCount < 5) {
        ingredientList.insertAdjacentHTML('beforeend', addInput)
    }
    
}

function removeIngredientInput() {
    let ingredientList = document.querySelector(".ingredient-refine-list")
    if(ingredientList.childElementCount > 1) {
        ingredientList.removeChild(ingredientList.lastElementChild);
    }
}

function clearIngredientInput() {
    let ingredientList = document.querySelector(".ingredient-refine-list");
    let initialList = `<div class="ingredient-input-div"><input type="text" class="form-control ingredient-input" placeholder="Ingredient"></div>`
    let checkBox = document.querySelectorAll(".mealCheckbox")
    ingredientList.innerHTML = initialList;
    for(let i=0; i<checkBox.length; i++) {
        checkBox[i].checked = false;
    }

}

function cardListener(list) {
    let mealCard = document.querySelectorAll(".mealCard")
    for(let i=0; i<mealCard.length; i++) {
        mealCard[i].addEventListener("click", function() {
            console.log(list[i])
            recipeModal(list[i])
        })
    }
}

function recipeModal(recipe) {
    let ingredientArray = recipe.ingredients;
    let ingredientList = '';
    let instructionArray = recipe.instructions;
    let instructionList = '';
    let videoLink = recipe.videoURL;
    let videoHTML = '';


    name = recipe.name
    for(let i=0; i<ingredientArray.length; i++) {
        ingredientList += `<input type="checkbox" id="ingredient${i+1}" name="ingredient${i+1}" value="${recipe.ingredients[i]}">
        <label for="ingredient${i+1}">${recipe.measurements[i]} <span class="modal-ingredient">${recipe.ingredients[i]}</span></label><br>`
    }
    for(let i=0; i<instructionArray.length; i++) {
        instructionList += `<li>${instructionArray[i]}</li>`
    }

    if(videoLink.length == 0) {
        videoLink = "No Video Provided";
        videoHTML = videoLink;

    } else if(videoLink.includes("watch?v=") == true) {
        videoLink = videoLink.replace("watch?v=", "embed/")
        videoHTML = `<iframe src="${videoLink}" title="description">`
    }else {
        videoHTML = `<iframe src="${videoLink}" title="description">`
    }

    let modalHTML = `
    <div class="modal fade" id="recipeModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="text-center" id="loginModalLabel">${name}</h3>
        </div>
          <div class="modal-list">
            ${ingredientList}
          </div>
          <h5 class="instructions-heading">Instructions</h5>
          <ol>${instructionList}</ol>
          <div>
            <h3>Video Link</h3>
                ${videoHTML}
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
      </div>
    </div>
  </div>`

  document.querySelector('.recipeModal').innerHTML = modalHTML
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openSearchNav() {
    if(filterTab == true){
        closeFilterNav()
    }
    if(searchTab == true) {
        closeSearchNav()
        return;
    }
    document.getElementById("search-refine").style.height = "100px";
    document.getElementById("ourRecipeMain").style.marginTop = "0px";
    searchTab = true;
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeSearchNav() {
    document.getElementById("search-refine").style.height = "0";
    document.getElementById("ourRecipeMain").style.marginTop = "0";
    searchTab = false
  }

  function openFilterNav() {
    if(searchTab == true) {
        closeSearchNav()
    }
    if(filterTab == true) {
        closeFilterNav()
        return;
    }
    document.getElementById("filter-refine").style.height = "250px";
    document.getElementById("filter-refine").style.margin = "2rem auto";
    document.getElementById("ourRecipeMain").style.marginTop = "0px";
    filterTab = true;
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeFilterNav() {
    document.getElementById("filter-refine").style.height = "0";
    document.getElementById("filter-refine").style.margin = "0px";
    document.getElementById("ourRecipeMain").style.marginTop = "0";
    filterTab = false;
}

