let searchNav = document.getElementById('Search')
let searchPage = document.getElementById('searchPage')
let meals = document.getElementById('meals')
let categories = document.getElementById('Categories')
let area = document.getElementById('Area')
let ingredients = document.getElementById('Ingredients')
let ContactUs = document.getElementById('ContactUs')
let EnteredName = false;
let EnteredEmail= false;
let EnteredPhone = false;
let EnteredAge = false;
let EnteredPassword = false;
let EnteredRepassword = false;
let btnSubmit = document.getElementById('btnSubmit')
let contactSection = document.getElementById('contactSection')


$(document).ready(function(){
$('.loader').fadeOut(500)

})

let navWidth = $('.side-navbar-content').outerWidth();
closeNav()
function closeNav(){

$('.side-navbar').animate({left:-navWidth},500)
$('#btnOpen').addClass('fa-align-justify')
$('#btnOpen').removeClass('fa-x')
$('.links li').animate({top : '300px'} , 500)

}


 function openNav(){

$('.side-navbar').animate({left:'0px'},500)
$('#btnOpen').removeClass('fa-align-justify')
$('#btnOpen').addClass('fa-x')
    for(let i = 0 ; i < 5 ; i++ ){
       $('.links li').eq(i).animate({top : '0px'} ,(i+5)*150 )
      }
}

$('#btnOpen').on('click', function(){
   if($('.side-navbar').css('left') == '0px' ){

        closeNav()
    }

else{
    openNav()
}



})

getMeals()

async function getMeals(item){

let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
let response = await api.json()
console.log(response.meals);
displayMeals(response.meals)

}

function displayMeals(name){

    let meal = '' ;
for( let i= 0 ; i < name.length ; i++)
{
    meal += `
    
    <div class="col-md-3">

<div class="meals"onclick="getDetails('${name[i].idMeal}') ">

  <img src="${name[i].strMealThumb }" class="w-100">
<div class="layer rounded-2 d-flex align-items-center">
<h3>${name[i].strMeal}</h3></div>
</div>
</div>
    
    `

}
 document.getElementById('meals').innerHTML = meal ;

}

async function searchByName(name){

let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
let response = await api.json()
console.log(response.meals)


if(response.meals){

    displayMeals(response.meals)
}
else{
    displayMeals([])
}
}

 async function searchByFirstLetter(letter){

    if(letter == ''){

        letter = 'a';
}

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let response = await api.json()
    console.log(response.meals)
    if(response.meals){

        displayMeals(response.meals)
    }
    else{
        displayMeals([])
    }
  
    

}





  function displaySearchPage(){

    searchPage.innerHTML =`
    
     <div class="col-md-6">

                <input oninput=" searchByName(this.value)" class="form-control bg-transparent w-95 text-white" type="text" placeholder="Search By Name">

            </div>

            <div class="col-md-6">

                <input oninput="searchByFirstLetter(this.value)"  maxlength="1" class="form-control bg-transparent w-95 text-white" type="text" placeholder="Search By First Letter">

            </div>

    `

   document.getElementById('meals').innerHTML=` `



}

 

searchNav.addEventListener('click',function(){

    displaySearchPage()
    closeNav()
})





















async function getCategories(){

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let response = await api.json()
    console.log(response.categories);
displayCategories(response.categories)
}

function displayCategories(category){

    searchPage.innerHTML =` `
    let meal = '' ;
    for( let i= 0 ; i < category.length ; i++)
    {
        meal += `
        
        <div class="col-md-3">
    
    <div class="meals" onclick="getMealsOfCategories('${category[i].strCategory}') ">
    
      <img src="${category[i].strCategoryThumb }" class="w-100">
    <div class="layer rounded-2 text-center">
    <h3>${category[i].strCategory}</h3>
    <p>${category[i].strCategoryDescription}</p>

    </div>
    </div>
    </div>
        `
    }
     document.getElementById('meals').innerHTML = meal ;
    
    }
    
    categories.addEventListener('click',function(){

     getCategories()
     closeNav()

    })

 async function getMealsOfCategories(category){

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let response = await api.json()
    console.log(response.meals);
displayMeals(response.meals.slice(0,20));



}







    async function getArea(){


        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        let response = await api.json()
        console.log(response.meals);
    displayArea(response.meals)
    }
    
    function displayArea(area){
    
        searchPage.innerHTML =` `

        let meal = '' ;
        for( let i= 0 ; i < area.length ; i++)
        {
            meal += `
             
            <div class="col-md-3">
                         
           <div class="meals text-light" onclick="getMealsOfArea('${area[i].strArea}') ">
     
     
                <i class="fa-solid fa-house-laptop fa-5x "></i>
                        
                <h3>${area[i].strArea}</h3>
     
     
             </div>
     
        </div>
            
            `
        }
         document.getElementById('meals').innerHTML = meal ;
        
        }

        area.addEventListener('click',function(){

           getArea()
           closeNav()
       
           })


           async function  getMealsOfArea(area) {

            let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
            let response = await api.json()
            console.log(response.meals)
            displayMeals(response.meals.slice(0,20))

           }













       
           async function getIngredients(){


            let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
            let response = await api.json()
            console.log(response.meals);
            displayIngredients(response.meals.slice(0,20))
        }
        
        function displayIngredients(ingredients){
        
            searchPage.innerHTML =` `

            let meal = '' ;
            for( let i= 0 ; i < ingredients.length ; i++)
            {
                meal += `
                 
                <div class="col-md-3">
                             
               <div class="meals text-light text-center" onclick="getIngredientsofmeals('${ingredients[i].strIngredient}')">
         
         
                    <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                            
                    <h3>${ingredients[i].strIngredient}</h3>
                    <p>${ingredients[i].strDescription.split(' ').slice(0,20).join(' ')}</p>

         
                 </div>
         
            </div>
                
                `
            }
             document.getElementById('meals').innerHTML = meal ;
            
            }
    
            ingredients.addEventListener('click',function(){
    
             getIngredients()
            closeNav()
           
               })
           

async function getIngredientsofmeals(Ingredients){

let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
let response = await api.json()
console.log(response.meals);
displayMeals(response.meals)
}


async function getDetails(id){
let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
let response = await api.json()
console.log(response.meals[1])
displayMealsDetalis(response.meals)
}

function displayMealsDetalis(meal){
    

    let cartona='';
    for( let i= 0 ; i < meal.length ; i++){
      
       
     cartona += `
    
    
    
    <div class="col-md-4 text-light">

    <img class="w-100 rounded-2" src="${meal[i].strMealThumb}" alt="">

    <h2>${meal[i].strMeal}</h2>


   </div>

   <div class="col-md-8 text-light ">

    <h2>Instructions</h2>

    <p>${meal[i].strInstructions}</p>

     
    <h3> <span class="fw-bold">Area :</span> ${meal[i].strArea} </h3>

    <h3> <span class="fw-bold">Category :</span> ${meal[i].strCategory} </h3>

   <h3>Recipes : </h3>

    <ul class="list-unstyled d-flex flex-wrap g-4">
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure1} ${meal[i].strIngredient1} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure2} ${meal[i].strIngredient2} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure3} ${meal[i].strIngredient3} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure4} ${meal[i].strIngredient4} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure5} ${meal[i].strIngredient5} 

</li>

<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure6} ${meal[i].strIngredient6} 

</li>



<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure7} ${meal[i].strIngredient7} 

</li>

<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure8} ${meal[i].strIngredient8} 

</li>

<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure9} ${meal[i].strIngredient9} 

</li>

<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure10} ${meal[i].strIngredient10} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure11} ${meal[i].strIngredient11} 

</li>

<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure12} ${meal[i].strIngredient12} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure13} ${meal[i].strIngredient13} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure14} ${meal[i].strIngredient14} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure15} ${meal[i].strIngredient15} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure16} ${meal[i].strIngredient16} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure17} ${meal[i].strIngredient17} 

</li>

<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure18} ${meal[i].strIngredient18} 

</li>

<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure19} ${meal[i].strIngredient19} 

</li>
<li class="alert alert-info list-unstyled w-15 m-1"> 
    ${meal[i].strMeasure20} ${meal[i].strIngredient20} 

</li>

    </ul>
      <h3>Tages: </h3><li class=" alert alert-danger list-unstyled">${meal[i].strTags}</li>

   

      <a target="_blank" href="${meal[i].strSource}" class="btn btn-success">Source</a>

      <a target="_blank" href="${meal[i].strYoutube}" class="btn btn-danger">Youtube</a>



   </div>
    
    
    
    `
   
}


    document.getElementById('meals').innerHTML = cartona ;

}


ContactUs.addEventListener('click', function(){

    displayContactusPage();
    closeNav()
})





function displayContactusPage(){

    meals.innerHTML =`
    <div class=" contact d-flex justify-content-center align-items-center" id="contactSection">
    <div class="container w-75 text-center ">
<div class="row g-3">

<div class="col-md-6">
<input class="form-control" type="text" id="name" placeholder="Enter Your Name" oninput="validations()">
<p class="alert alert-danger mt-1 w-100 text-center d-none" id="alertName" >Special characters and numbers not allowed </p>
</div>


<div class="col-md-6">
  <input class="form-control" type="text" id="email" placeholder="Enter Your Email" oninput="validations()" >
  <p class="alert alert-danger mt-1 w-100 text-center d-none" id="alertEmail" >Email not valid *exemple@yyy.zzz </p>
  </div>
  
  <div class="col-md-6">
    <input class="form-control" type="number" id="phone" placeholder="Enter Your Phone" oninput="validations()" >
    <p class="alert alert-danger mt-1 w-100 text-center d-none" id="alertPhone" >Enter valid Phone Number </p>
    </div>

    <div class="col-md-6">
      <input class="form-control" type="number" id="age" placeholder="Enter Your Age" oninput="validations()" >
      <p class="alert alert-danger mt-1 w-100 text-center d-none" id="alertAge" >Enter valid age </p>
      </div>

      <div class="col-md-6">
        <input class="form-control" type="password" id="password" placeholder="Enter Your Password" oninput="validations()" >
        <p class="alert alert-danger mt-1 w-100 text-center d-none" id="alertPassword" >Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
        </div>

        <div class="col-md-6">
          <input class="form-control" type="password" id="Repassword" placeholder="Repassword" oninput="validations()" >
          <p class="alert alert-danger mt-1 w-100 text-center d-none" id="alertRepassword" >Enter valid repassword</p>
          </div>

</div>

<button class="btn btn-outline-danger mt-4" id="btnSubmit" disabled>Submit</button>




</div>
</div>
     
    `
    document.getElementById('name').addEventListener('focus' , function(){
       
        EnteredName = true;
    
    
    })
    
    
    
    document.getElementById('email').addEventListener('focus' , function(){
      
       EnteredEmail = true;
    
    })
    
    
    
    document.getElementById('phone').addEventListener('focus' , function(){
      
    EnteredPhone = true;
    
    })
    
    
    
    document.getElementById('age').addEventListener('focus' , function(){
      
    EnteredAge = true;
    
    })
    
    
    
    document.getElementById('password').addEventListener('focus' , function(){
      
    EnteredPassword = true;
    
    })
    
    
    
    document.getElementById('Repassword').addEventListener('focus' , function(){
      
   EnteredRepassword = true;
    })
    
    
}

function validationName(){
let regex = /^[a-zA-Z]+$/
return regex.test( document.getElementById('name').value)

}

function validationEmail(){
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test( document.getElementById('email').value)
}

function validationPhone(){
    let regex = /^01[0125][0-9]{8}$/
    return regex.test( document.getElementById('phone').value)

}

function validationAge(){
    let regex = /^\S[0-9]{0,1}$/
    return regex.test( document.getElementById('age').value)
}

function validationPassword(){
let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
return regex.test( document.getElementById('password').value)
}

function validationRepassword(){

    return  document.getElementById('Repassword').value ==  document.getElementById('password').value
    }


function validations(){


    if(EnteredName){

        if( validationName() == true  ){

            document.getElementById('alertName').classList.add('d-none')
     
     
         }
     
         else{
     
             document.getElementById('alertName').classList.remove('d-none')
     
     
         }


    }

    if(EnteredEmail){


        if( validationEmail() == true  ){

            document.getElementById('alertEmail').classList.add('d-none')
     
     
         }
    
        else{
              
            document.getElementById('alertEmail').classList.remove('d-none')
    
    
        }



    }
   

if(EnteredPhone ){

    if( validationPhone() == true  ){

        document.getElementById('alertPhone').classList.add('d-none')
 
 
     }

    else{
          
        document.getElementById('alertPhone').classList.remove('d-none')


    }

}


if(EnteredAge ){

    if( validationAge() == true  ){

        document.getElementById('alertAge').classList.add('d-none')
 
 
     }

    else{
          
        document.getElementById('alertAge').classList.remove('d-none')


    }

}

if(EnteredPassword ){
    if( validationPassword() == true  ){

        document.getElementById('alertPassword').classList.add('d-none')
 
 
     }

    else{
          
        document.getElementById('alertPassword').classList.remove('d-none')


    }



}
    
if(EnteredRepassword){

    if( validationRepassword() == true  ){

        document.getElementById('alertRepassword').classList.add('d-none')
 
 
     }

    else{
          
        document.getElementById('alertRepassword').classList.remove('d-none')


    }




}
    
if( validationName() && validationEmail() && validationPhone() && validationAge() && validationPassword() && validationRepassword() )

    {
        document.getElementById('btnSubmit').removeAttribute('disabled')
    }

    else{
       
        document.getElementById('btnSubmit').setAttribute('disabled' , true)


    }





}




