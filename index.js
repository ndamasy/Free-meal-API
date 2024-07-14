
const BaseUrl = "https://www.themealdb.com/api/json/v1"
const ApiKey = "/1"




// display all meals
const homeAllMealsPhoto = document.querySelector('.home-meal');
async function getAllMeals(allMeals) {
    try {
        const mainIngrediantRequirment = '/search.php?s=' + allMeals;
        const url = BaseUrl + ApiKey + mainIngrediantRequirment;
        const options = {
            method: 'GET',
            headers: {
                ApiKey,
            }
        };
        const response = await fetch(url, options);
        const _result = await response.json();
        displayAllMeals(_result)

    } catch (error) {
        console.error(error);
    }
}
function displayAllMeals(allMealsImg) {

    var cartona = '';
    if (allMealsImg.meals && allMealsImg.meals.length > 0) {
        for (let i = 0; i < allMealsImg.meals.length; i++) {
            cartona += `
                <div class="col-lg-3">
                <div class="home-photo" data-id="${allMealsImg.meals[i].idMeal}">
                <img src="${allMealsImg.meals[i].strMealThumb}" class="w-100" >
               <div class="overlay">
                <h2>${allMealsImg.meals[i].strMeal}</h2>
                 </div>
                 </div>
                     </div>
                `
        }
    }

    homeAllMealsPhoto.innerHTML = cartona;
}
document.addEventListener("DOMContentLoaded", function (e) {
    const allMeals = '';
    getAllMeals(allMeals)
    // const mealId = e.target.dataset.idMeal;
    // getInstruction(mealId);


});

// display all meals by categroy
async function getAllMealsByCategry() {
    try {
        const mainIngrediantRequirment = '/categories.php';
        const url = BaseUrl + ApiKey + mainIngrediantRequirment;
        const options = {
            method: 'GET',
            headers: {
                ApiKey,
            }
        };
        const response = await fetch(url, options);

        const _result = await response.json();
        displayAllCtegories(_result)

    } catch (error) {
        console.error(error);
    }
}
function displayAllCtegories(allCtego) {

    var cartona = '';
    if (allCtego.categories && allCtego.categories.length > 0) {
        for (let i = 0; i < allCtego.categories.length; i++) {
            cartona += `
                      <div class="col-lg-3">
                       <div class="category-photo" data-id="${allCtego.categories[i].idCategory}">
                        <img src="${allCtego.categories[i].strCategoryThumb}" class="w-100">
                        <div class="category-overlay">
                            <h2>${allCtego.categories[i].strCategory}</h2>
                            <p> ${allCtego.categories[i].strCategoryDescription.slice(0, 20)}</p>
                        </div>
                    </div>
                </div>
                `
        }
    }
    const categoryPage = document.querySelector('.categories')

    categoryPage.innerHTML = cartona;


}

function hideAllExcept(classToShow) {
    $(".categories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".ingrediant").addClass("d-none");
    $(".area").addClass("d-none");
    $(".contact").addClass("d-none");
    $(classToShow).removeClass("d-none");
}

document.getElementById('category-link').addEventListener('click', function (e) {
    homeAllMealsPhoto.classList.add('d-none')
    const categoMeals = '';
    getAllMealsByCategry(categoMeals)
    const categoryResponseResult = '';
    getMealByMainIngrediant(categoryResponseResult)
    const mealId = e.target.dataset.idMeal;


    hideAllExcept(".categories")
})


// all meals instructions
async function getInstruction(id) {
    try {
        const mainIngrediantRequirment = '/lookup.php?i=' + id;
        const url = BaseUrl + ApiKey + mainIngrediantRequirment;
        const options = {
            method: 'GET',
            headers: {
                ApiKey,
            }
        };
        const response = await fetch(url, options);
        const _result = await response.json();
        displayInstructions(_result)
    } catch (error) {
        console.error(error);
    }
}
function displayInstructions(mealDetails) {
    let mealContainer = '';
    if (mealDetails.meals && mealDetails.meals.length > 0) {
        for (let i = 0; i < mealDetails.meals.length; i++) {
            mealContainer += `
         <div class="row">
                <div class="col-lg-4">
                    <div class="instruction-photo" data-id="${mealDetails.meals[i].idMeal}">
                        <img src="${mealDetails.meals[i].strMealThumb}" class="w-100 rounded-3">
                        <h2 class="text-white">${mealDetails.meals[i].strMeal}</h2>
                    </div>
                </div> 
                <div class="col-lg-8">
                    <div class="instruction-details">
                        <h2 class="text-white fs-2">${mealDetails.meals[i].strInstructions}</h2>
                        <p class="text-white">.</p>
                        <div class="instructions-data">
                            <p class="text-white fs-2 fw-semibold my-0">Area : <span class="fw-normal">${mealDetails.meals[i].strArea}</span></p>
                            
                            <p class="text-white fw-bold fs-3 my-0">Category : <span class="fw-normal">${mealDetails.meals[i].strCategory}</span></p>

                            <p class="text-white fs-4 fw-semibold my-0">Recipes : 
                            <span>${mealDetails.meals[i].strIngredient1}</span>
                            <span>${mealDetails.meals[i].strIngredient2}</span>
                            <span>${mealDetails.meals[i].strIngredient3}</span>
                            <span>${mealDetails.meals[i].strIngredient4}</span>
                            <span>${mealDetails.meals[i].strIngredient5}</span>
                            <span>${mealDetails.meals[i].strIngredient6}</span>
                            <span>${mealDetails.meals[i].strIngredient7}</span>
                            <span>${mealDetails.meals[i].strIngredient8}</span>
                            <span>${mealDetails.meals[i].strIngredient9}</span>
                            <span>${mealDetails.meals[i].strIngredient10}</span>
                            <span>${mealDetails.meals[i].strIngredient11}1</span>
                            </p>
                                
                            <p class="text-white fs-4 fw-semibold">Tags : <h5 class="  tag">${mealDetails.meals[i].strCategory}</h5></p>
                            <div class="instruction-btn">
                                <button class="btn source">Source</button>
                                <button class="btn youtube">Youtube</button>
                            </div>

                        </div>


                    </div>
                </div>
     </div>`;
        }
    }

    document.querySelector(".section").innerHTML = mealContainer;
}
const instructions = document.querySelector('.instruction');
const allMeals = document.querySelectorAll('.home-photo');
const homeMeals = document.querySelector('.home-meal');

allMeals.forEach(meal => meal.addEventListener('click', function (e) {
    instructions.classList.remove('d-none')
    homeMeals.classList.add('d-none')
    e.stopPropagation;
    e.preventDefault;
    const clickedMealPhoto = meal.children[0].getAttribute('src');

    const mealId = e.target.dataset.idMeal;
    getInstruction(mealId);
}));



$(window).on('load', function () {
    $('.loading').fadeOut(600, function () {
        $('body').css("overflow", "auto")
    });
});

$('.open-btn').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('.side-bar ul').animate({ left: 0 }, 1000);
    $('.fa-xmark').removeClass('d-none');
    $('.fa-bars').addClass('d-none');
    $(this).animate({ left: $(".side-bar ul").outerWidth() + 10 }, 1000);
})

$('.fa-xmark , #link-1 , #category-link , #area-link , #ingrediant-link , #contact-link').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('.fa-bars').removeClass('d-none');
    $('.fa-xmark').addClass('d-none');
    $('.side-bar ul').animate({ left: -$(".side-bar ul").outerWidth() }, 1000);
    $(".open-btn").animate({ left: "10px" }, 1000);
});


// function getAllCategories() {
//     const requirment = "/categories.php"
//     fetch(BaseUrl + ApiKey + requirment)
//         .then(res => res.json())
//         .then(result => displayCategories(result))
//         .catch(err => console.error(err))
// }
// function displayCategories(categories) {
//     
//     return categories;
// }
// getAllCategories()


//   get meal by ingrediant main name
async function getMealByMainIngrediant(category) {
    try {
        const mainIngrediantRequirment = '/filter.php?i=' + category;
        const url = BaseUrl + ApiKey + mainIngrediantRequirment;
        const options = {
            method: 'GET',
            headers: {
                ApiKey,
            }
        };
        const response = await fetch(url, options);
        const _result = await response.json();

        displayMainIngrediant(_result)
    } catch (error) {
        console.error(error);
    }
}
function displayMainIngrediant(result) {
    var cartona = '';
    if (result.meals && result.meals.length > 0) {
        for (let i = 0; i < result.meals.length; i++) {
            cartona += `
                <div class="col-lg-3">
                    <div class="ingrediant-photo">
                        <img src="${result.meals[i].strMealThumb}" class="w-100  rounded-2">
                        <div class="ingrediant-overlay">
                            <h2>${result.meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            `
        }
    }
    const mainIngredCategory = document.querySelector('.main-ingrediant');
    mainIngredCategory.innerHTML = cartona;
}


// search by name section handling
const searchContainer = document.querySelector('.search-result-container');
document.getElementById('link-1').addEventListener('click', function () {
    const searchPage = document.querySelector('.search')
    searchPage.classList.remove('d-none');
    homeMeals.classList.add('d-none')
    hideAllExcept(".search")

})
async function searchByCategoryName(categoryName) {

    try {
        const mainIngrediantRequirment = '/search.php?s=' + categoryName;
        const url = BaseUrl + ApiKey + mainIngrediantRequirment;
        const options = {
            method: 'GET',
            headers: {
                ApiKey,
            }
        };
        const response = await fetch(url, options);
        const _result = await response.json();

        displayByName(_result)
    } catch (error) {
        console.error(error);
    }

}

function displayByName(name) {
    var cartona = '';
    if (name.meals && name.meals.length > 0) {
        for (let i = 0; i < name.meals.length; i++) {
            cartona += `
                <div class="col-lg-3">
                    <div class="ingrediant-photo">
                        <img src="${name.meals[i].strMealThumb}" class="w-100  rounded-2">
                        <div class="ingrediant-overlay">
                            <h2>${name.meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            `

        }
    }

    searchContainer.innerHTML = cartona;
}
const serachInput = document.getElementById('exampleFormControlInput1');
serachInput.addEventListener("change", function (e) {
    const searchParam = e.target.value;
    searchByCategoryName(searchParam);
});

// search by firest litter section handling
document.getElementById('link-1').addEventListener('click', function () {
    const searchPage = document.querySelector('.search')
    searchPage.classList.remove('d-none');
    homeMeals.classList.add('d-none')
})
async function searchByFirestLitter(categoryFirestLitter) {

    try {
        const mainIngrediantRequirment = '/search.php?f=' + categoryFirestLitter;
        const url = BaseUrl + ApiKey + mainIngrediantRequirment;
        const options = {
            method: 'GET',
            headers: {
                ApiKey,
            }
        };
        const response = await fetch(url, options);
        const _result = await response.json();

        filterByFirestLitter(_result)
    } catch (error) {
        console.error(error);
    }

}

function filterByFirestLitter(firestLitter) {
    var cartona = '';
    if (firestLitter.meals && firestLitter.meals.length > 0) {
        for (let i = 0; i < firestLitter.meals.length; i++) {
            cartona += `
                <div class="col-lg-3">
                    <div class="ingrediant-photo" data-id="${firestLitter.meals[i].idMeal}" >
                        <img src="${firestLitter.meals[i].strMealThumb}"  class="w-100  rounded-2">
                        
                        <div class="ingrediant-overlay">
                            <h2>${firestLitter.meals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            `
        }
    }
    const searchContainer = document.querySelector('.search-result-container');
    searchContainer.innerHTML = cartona;
}
const ingrediantPhotoResult = document.querySelectorAll('.ingrediant-photo');
const serachFirestLitterInput = document.getElementById('exampleFormControlInput2');
serachFirestLitterInput.addEventListener("change", function (e) {
    const searchParam = e.target.value;
    searchByFirestLitter(searchParam);

});
searchContainer.childNodes.forEach(photo => photo.addEventListener('click', function (e) {
    e.stopPropagation
    e.preventDefault
    const mealId = e.target.dataset.idMeal;

    getInstruction(mealId);
}))


//  search by area section handling
const areaMealContainer = document.querySelector('.area-container-meals')
async function searchByAreaName(areaMealsName) {

    try {
        const mainIngrediantRequirment = `/filter.php?a=` + areaMealsName;
        const url = BaseUrl + ApiKey + mainIngrediantRequirment;

        const options = {
            method: 'GET',
            headers: {
                ApiKey,
            }
        };
        const response = await fetch(url, options);
        const _result = await response.json();

        displayMealByArea(_result)
    } catch (error) {
        console.error(error);
    }

}
function displayMealByArea(area) {
    var cartona = '';
    if (area.meals && area.meals.length > 0) {
        for (let i = 0; i < area.meals.length; i++) {
            cartona += `
                    <div class="col-lg-3">
                        <div class="ingrediant-photo">
                            <img src="${area.meals[i].strMealThumb}" class="w-100  rounded-2">
                            <div class="ingrediant-overlay">
                                <h2>${area.meals[i].strMeal}</h2>
                            </div>
                        </div>
                    </div>
                `
        }
    }
    areaMealContainer.innerHTML = cartona;
}
const areaPage = document.querySelector('.area')
document.getElementById('area-link').addEventListener('click', function () {
    areaPage.classList.remove('d-none')
    homeMeals.classList.add('d-none')
    hideAllExcept(".area")
})
const areaName = document.querySelectorAll('.area-section');
areaName.forEach(area => area.addEventListener('click', function () {
    areaPage.classList.add('d-none')
    areaMealContainer.classList.remove('d-none')
    const areaMeals = area.children[2].innerText.trim();
    searchByAreaName(areaMeals)
}))


//  search by ingrediant section handling
const ingrediantPage = document.querySelector('.ingrediant');
const ingrediantMealsContainer = document.querySelector('.ingrediant-container-meals')
const ingrediantMealSection = document.querySelectorAll('.ingrediant-section')
async function filterMealsByIngrediants(ingrediantName) {

    try {
        const mainIngrediantRequirment = `/filter.php?i=` + ingrediantName;
        const url = BaseUrl + ApiKey + mainIngrediantRequirment;

        const options = {
            method: 'GET',
            headers: {
                ApiKey,
            }
        };
        const response = await fetch(url, options);
        const _result = await response.json();
        displayMealsByIngrediants(_result)
    } catch (error) {
        console.error(error);
    }

}
function displayMealsByIngrediants(ingred) {

    var cartona = '';
    if (ingred.meals && ingred.meals.length > 0) {
        for (let i = 0; i < ingred.meals.length; i++) {
            cartona += `
                        <div class="col-lg-3">
                            <div class="ingrediant-photo" data-id="${ingred.meals[i].idMeal}">
                                <img src="${ingred.meals[i].strMealThumb}" class="w-100  rounded-2">
                                <div class="ingrediant-overlay">
                                    <h2>${ingred.meals[i].strMeal}</h2>
                                </div>
                            </div>
                        </div>
                    `
        }

    }
    ingrediantMealsContainer.innerHTML = cartona;
}

ingrediantMealSection.forEach(ingredName => ingredName.addEventListener('click', function () {
    ingrediantPage.classList.add('d-none')
    ingrediantMealsContainer.classList.remove('d-none')
    const ingName = ingredName.children[1].innerText.trim();

    filterMealsByIngrediants(ingName)
}))
document.getElementById('ingrediant-link').addEventListener('click', function () {
    ingrediantPage.classList.remove('d-none')
    homeMeals.classList.add('d-none')
    hideAllExcept(".ingrediant")
})


document.getElementById('contact-link').addEventListener('click', function () {
    const contactPage = document.querySelector('.contact')
    contactPage.classList.remove('d-none')
    homeMeals.classList.add('d-none')
    hideAllExcept(".contact")
})






