const lang=sessionStorage.getItem('lang')
console.log(lang)
console.log(sessionStorage.getItem('lang'))


//creating URL base
const BASE_URL='https://api.themoviedb.org/3/';
 //creating axios

 const API= axios.create({
  baseURL:BASE_URL,
  Headers:{
    'Content-Type':'application/json;charset=utf-8'
  },
  params:{
    'api_key':API_KEY,
    
    'language':lang===null ?'en':lang
      
    }

  
})

//localStorage
//lista de peliculas en me gusta
function likedMoviesList(){
  //pasrseamos la info
   const item=JSON.parse(localStorage.getItem('liked_movies'));
   let movies;
   //si la lista tiene algo
   if(item){
     movies=item;
     //si la lista está vacía
   }else{
       movies={}
   }
  return movies
}
//para darle like o dislike a la pelicula 
function likeMovie(movie){
 //llamamos la función de películas con like
  const likedMovies=likedMoviesList()
  //si la pelicula ya existe la elimina, don´t like
    if(likedMovies[movie.id]){
      //eliminamos la pelicula del arreglo
      likedMovies[movie.id]=undefined;
      //si la película no existe la agrega, like
    }else{
      //guardamos todo el objeto pelicula 
      likedMovies[movie.id]=movie;
    }
    //agregamos likedMovies al localStorage, lo convertimos a string
    localStorage.setItem('liked_movies',JSON.stringify(likedMovies));
    
}

//funciones para las diferentes categorias o vistas
async function getTrendingMoviesPreview(){
  const {data}= await API('trending/movie/day');
 
  const movies=data.results;
  
  //cleannig html to avoid double louding
  movieContainer.innerHTML="";
  createPreviewMovies(movieContainer,movies)

  
 
 
}

async function categoriesPreview(){
  const {data}= await API('genre/movie/list');
  const movies=data.genres;
  //createMovies(categories, section)
  section.innerHTML="";
  movies.map(movie=>{

   
    const a=document.createElement("a");

    a.addEventListener("click",function(){
      location.hash="#movie="+movie.id;
      
    })

    a.classList.add("classifications-link");
    a.setAttribute("data-img",'#category='+movie.id+'-'+movie.name)
    
    

    const h3=document.createElement("h3");
    h3.classList.add("id",movie.id)
    h3.innerText='>'+movie.name;
    a.appendChild(h3)
    section.appendChild(a);

    //llamando al lazyload
    lazyLoaderHref.observe(a)
  })

}
async function getMoviesBycategory(id,name){
  //split to avoid spaces
  name=name.split("%20");
  //join again in one word
  name=name.join(" ")
  //replace accents
  name.includes('%C3%B3') ? name= name.replace('%C3%B3','ó'):
  name.includes('%C3%A9') ?  name= name.replace('%C3%A9','é'):
  name.includes('%C3%AD') ?  name= name.replace('%C3%AD','í'):
  name.includes('%C3%BA') ?  name= name.replace('%C3%BA','ú'): name=name;

  const {data}= await API('discover/movie',{
   params:{
     with_genres:id
   }
  });
  const movies=data.results;
  MaxPages=data.total_pages;
  
  moviesByClasification.innerHTML="";
  
  section_title.innerHTML='Categoría: '+name

  createMovies(moviesByClasification,movies)
}

async function getMovieBySearch(query){
  const {data} =await API('search/movie',{
    params:{
       query:query
    },
  });
  const movies=data.results;
  MaxPages=data.total_pages;
  console.log(MaxPages)
   section_title.innerHTML='Resultados '
  createMovies(moviesByClasification,movies,)
 
}

async function getTrendingMovies(){
  const {data}= await API('trending/movie/day')
  const movies=data.results;
  MaxPages=data.total_pages;
  section_title.innerHTML='Nuevas películas'
  createMovies(moviesByClasification,movies)

  // const btn=document.createElement("button");
  // btn.classList.add("btn")
  // btn.innerText="cargar más";
  // btn.addEventListener("click",getPaginatedMovies);
  // moviesByClasification.appendChild(btn)

  
 
}
async function getPopularMovies(){
  const {data}=await API('/movie/popular')
  const movies=data.results;
  MaxPages=data.total_pages;
  section_title.innerHTML='Populares'
  createMovies(moviesByClasification,movies)

  
 
}

async function getUpcommingMoviesPreview(){
  const {data}=await API('/movie/upcoming');
  const movies=data.results;
  commingSoon.innerHTML="";
  section_title.innerHTML="Proximamente"

  createPreviewMovies(commingSoon,movies)

  // movies.map(movie=>{
   
  //   const div=document.createElement("div");

  //   div.addEventListener("click",function(){
  //     location.hash="#movie="+movie.id;
      
  //   })

  //   div.classList.add("commingSoon-container");
  //   div.classList.add("container");
  //   const img=document.createElement("img");
  //   img.setAttribute("alt",movie.title);
  //   img.setAttribute("data-img",'https://image.tmdb.org/t/p/w300/'+movie.poster_path);
  //   lazyLoader.observe(img)
   
  //   const p=document.createElement("p");
  //   p.innerText=movie.original_title;
  //   div.appendChild(img)
  //   div.appendChild(p);
   
  //   commingSoon.appendChild(div);
    
  // })

}
async function getTopRatedMovies(){
  const {data}=await API('/movie/top_rated');
  const movies=data.results
 
  topRatedMovies.innerHTML="";
  movies.map(movie=>{
   
    const div=document.createElement("div");

    div.addEventListener("click",function(){
      location.hash="#movie="+movie.id;
      
    })

    div.classList.add("topMovie-container");
    const img=document.createElement("img");
    img.setAttribute("alt",movie.title);
    if(movie.backdrop_path===null){
      
      img.setAttribute("data-img","https://image.tmdb.org/t/p/original"
    +movie.poster_path);
      lazyLoader.observe(img)
    }else{
    img.setAttribute("src","https://image.tmdb.org/t/p/original"
    +movie.backdrop_path);
    }

    //botón para el like
    const likeButton=document.createElement("button");
    likeButton.classList.add("new-container--likeButton")

    //verificamos si la película ya está en la lista para ponerle por defecto la clase de new-container--dontLikeButton
    likedMoviesList()[movie.id]?likeButton.classList.add("new-container--dontLikeButton"):likeButton.classList.add("new-container--likeButton");

    const p=document.createElement("p");
    const pText=document.createTextNode(movie.title);
    p.appendChild(pText);
    div.appendChild(img);
    div.appendChild(likeButton);
    div.appendChild(p);
    topRatedMovies.appendChild(div);

     //para poner o quitar el like
     likeButton.addEventListener("click",(e)=>{
      e.preventDefault();
    
      //para agregar  o quitar clase con el click
      likeButton.classList.toggle('new-container--dontLikeButton')
      //agregando pelicula a localStorage
      likeMovie(movie);
      window.location.reload();
      document.documentElement.scrollTop=0;
      document.body.scrollTop=0;
 })

    
  })

}

async function  getMovieById(id){
  //has not an array as an answer
  const {data:movie}= await API('movie/'+id)
 
  const section_title=document.querySelector(".movieDetailContainer .section-title");
  section_title.innerText=movie.title
  movieDetail.innerHTML=""
  movieDetail.classList.add("movie")
 
 
    const div=document.createElement("div");
    div.classList.add("movieByCategoryContainer");
    div.classList.add("movieByIdContainer");

    const span=document.createElement("span");
    span.innerHTML='Calificación '+movie.vote_average;
    const img=document.createElement("img");
    img.setAttribute("alt",movie.title);
    img.setAttribute('data-img','https://image.tmdb.org/t/p/original'+movie.poster_path);
    

    if(movie.poster_path===null){
      img.setAttribute('src','https://image.tmdb.org/t/p/original'+movie.backdrop_path);
    }
    if(movie.backdrop_path===null){
        img.setAttribute('src','https://image.tmdb.org/t/p/original'+movie.poster_path);
      }
      if(movie.backdrop_path===null && movie.poster_path===null){
          img.setAttribute('src','https://image.tmdb.org/t/p/original'+'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb-j5czZKCBg2Og1We4HoVkt-YBX8dwiz_kQ&usqp=CAU');
        }
    
        lazyLoader.observe(img);
    
    
    const p=document.createElement("p");
    if(movie.overview!=""){
      p.innerHTML=movie.overview;
    }else{
      p.innerHTML="No cuenta con descripción disponible, lo sentimos!"
    }
   
    div.appendChild(span);
    div.appendChild(img);
    div.appendChild(p);

    
    movieDetail.appendChild(div);
    
    relatedMovies(id)

}

async function relatedMovies(id){

  const {data}= await API('movie/'+id+'/recommendations')
  const movies=data.results;
  MaxPages=data.total_pages;
  section_title.innerText='Recomendadas'
  //checking if there is not related movies
  if(movies.length<=0){
    section_title.innerText='Lo sentimos no tenemos recomendaciones para este título'

  }else{
    
  createMovies(moviesByClasification,movies)
  }
}

function getLikedMovies(){
  const likedMovies=likedMoviesList();
  //convertir el objeto en array
  const moviesArray=Object.values(likedMovies)

  

  const section_title=document.querySelector(".favouritesContainer .section-title");
  section_title.innerHTML="Mis favoritas"
  
  createPreviewMovies(favourites,moviesArray)
 
        
 
}


