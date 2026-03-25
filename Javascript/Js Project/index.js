

let allMovies=[];

const movieContainer=document.getElementById("movies-container");

async function getMoviesData(){
    try{
       const response=await fetch("http://localhost:3000/movies");
       allMovies=await response.json();
        displayMovies(allMovies);
    }catch(err){
        console.log(err)
    }
}

async function handleCart(movie){
    console.log(movie)
try{
     let response= await fetch("http://localhost:3000/cart",{
        method:"POST",
         headers: {
                'Content-Type': 'application/json', 
            },
         body:JSON.stringify(movie)
    });
    alert("Movie Added to Cart")
}catch(err){
    console.log(err)
}
}


 function displayMovies(movies=allMovies){
    if(!movieContainer){
        console.log("Movies container is missing")
    }
   if(!movies || movies.length==0){
    movieContainer.innerHTML=`<p>No movies available</p>`
   }
   movieContainer.innerHTML="";
   movies.forEach(movie=>{
   const card=document.createElement("div");
 
 card.className="movie-card";
 card.innerHTML=`
 <div class="movie-poster"> 
 <img src=${movie.poster} class="movie-poster-img"/>
 </div>
 <div class="movie-info">
 <div class="movie-title">${movie.title}</div>
 <div class="movie-year">${movie.year}</div>
  <div class="movie-genre">${movie.Category}</div>
 <div class="movie-rating">⭐${movie.rating}</div>
 <div class="movie-buttons">
    <button class="nav-btn btn-cart" onclick='handleCart(${JSON.stringify(movie)})'>Cart</button>
    <button class="nav-btn btn-favourite">❤️Favourite</button>
 </div>
 </div>
`
// let cartBtn=card.querySelector(".btn-cart");
// cartBtn.addEventListener("click",()=>{
//     // handleCart(movie);
//     console.log("test click")
// })
 movieContainer.appendChild(card);
})

 }







getMoviesData()



const loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"));

const authSection=document.getElementById("auth-section");
if(loggedInUser){
   authSection.innerHTML=`<span class="user-name">Welcome ${loggedInUser.name}</span>
   <button class="nav-btn btn-logout" onClick="Logout()">Logout</button>` 
}

function Logout(){
    localStorage.removeItem("loggedInUser");
    location.reload();
}