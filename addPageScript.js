if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    let ingredientAdd = document.querySelector("#ingredient-add-button");
    ingredientAdd.addEventListener('click', addIngredient)

    let ingredientRemove = document.querySelector("#ingredient-remove-button");
    ingredientRemove.addEventListener('click', removeIngredient)

    let instructionAdd = document.querySelector("#instruction-add-button");
    instructionAdd.addEventListener('click', addInstruction)

    let instructionRemove = document.querySelector("#instruction-remove-button");
    instructionRemove.addEventListener('click', removeInstruction)

    let pictureUpload = document.querySelector('#picture');
    pictureUpload.addEventListener('change', pictureUploadText)
}

function addIngredient() {
    let addRange = document.querySelector("#ingredient-list");
    let inputCount = document.querySelectorAll(".ingredient-input").length
    let addInput = `
    <div class="row added-input">
          <div class="mb-2 col-md-2 col-sm-3 col-xs-3 ingredient-amount">
            <input type="input" class="form-control measurement-input" id="measurement${inputCount}">
          </div>
  
          <div class=" mb-2 col-md-6 col-sm-6 col-xs-auto ingredient-name">
            <input type="input" class="form-control ingredient-input" id="ingredient${inputCount}" placeholder="Ingredient ${inputCount+1}">
          </div>
        </div>
        `
    addRange.insertAdjacentHTML('beforeend', addInput)
}

function removeIngredient() {
    let ingredientElements = document.querySelectorAll(".added-input");
    let lastIngredientElement = ingredientElements[ingredientElements.length-1];
    let ingredientList = document.querySelectorAll("#ingredient-list")
    if(ingredientElements.length>0) {
        ingredientList[0].removeChild(lastIngredientElement);
    }
}

function pictureUploadText() {
    let previewField = document.querySelector(".preview-field")
    if(previewField.childElementCount < 1) {
        let pictureUpload = document.querySelector('#picture');
        console.log(pictureUpload.files)
        let picFile = pictureUpload.files
        const image = document.createElement('img');
        image.classList.add('picture-preview')
        image.src = URL.createObjectURL(picFile[0]);
        previewField.innerText = ''
        previewField.append(image)
        document.querySelector(".custom-file-label").innerHTML = picFile[0].name
    } else {
        previewField.innerHTML='Preview'
        let pictureUpload = document.querySelector('#picture');
        console.log(pictureUpload.files)
        let picFile = pictureUpload.files
        const image = document.createElement('img');
        image.classList.add('picture-preview')
        image.src = URL.createObjectURL(picFile[0]);
        previewField.innerText = ''
        previewField.append(image)
        document.querySelector(".custom-file-label").innerHTML = picFile[0].name
    }
    

   
}

function addInstruction() {
    let addRange = document.querySelector("#instruction-list");
    let inputCount = document.querySelectorAll(".instruction-input").length
    let addInput = `
        <div class="form-group col-auto added-instruction">
            <label for="step${inputCount+1}" class="">Step ${inputCount+1}</label>
            <textarea class="form-control instruction-input" id="step${inputCount+1}" rows="6" cols="40"></textarea>
        </div>
        `
    addRange.insertAdjacentHTML('beforeend', addInput)
}

function removeInstruction() {
    let instructionElements = document.querySelectorAll(".added-instruction");
    let lastInstructionElement = instructionElements[instructionElements.length-1];
    let instructionList = document.querySelectorAll("#instruction-list")
    if(instructionElements.length>0) {
        instructionList[0].removeChild(lastInstructionElement);
    }
}
