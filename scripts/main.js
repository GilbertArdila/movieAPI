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
    'language':'es'

  }
})

async function getTrendingMoviesPreview(){
  const {data}= await API('trending/movie/day');
 
  const movies=data.results;
  
  //cleannig html to avoid double louding
  movieContainer.innerHTML="";
  movies.map(movie=>{
   
    const div=document.createElement("div");
    div.classList.add("new-container");
    div.classList.add("container");
    const img=document.createElement("img");
    img.setAttribute("alt",movie.title);
    img.setAttribute("src",'https://image.tmdb.org/t/p/w300/'+movie.poster_path);
   
    const p=document.createElement("p");
    p.innerText=movie.original_title;
    div.appendChild(img)
    div.appendChild(p);
   
    movieContainer.appendChild(div);
    
  })
 
}

async function categoriesPreview(){
  const {data}= await API('genre/movie/list');
  const categories=data.genres;
  //createMovies(categories, section)
  section.innerHTML="";
  categories.map(category=>{
   
    const a=document.createElement("a");
    a.classList.add("classifications-link");
    a.setAttribute("href",'#category='+category.id+'-'+category.name)
    const h3=document.createElement("h3");
    h3.classList.add("id",category.id)
    h3.innerText='>'+category.name;
    a.appendChild(h3)
    section.appendChild(a);
  })



}
async function getMoviesBycategory(id,name){
  const {data}= await API('discover/movie',{
   params:{
     with_genres:id
   }
  });
  const movies=data.results;

  moviesByClasification.innerHTML="";
 
  
  section_title.innerHTML='Peliculas de '+name

  movies.map(movie=>{
    const div=document.createElement("div");
    div.classList.add("movieByCategoryContainer");
    const span=document.createElement("span");
    span.innerHTML='Calificación '+movie.vote_average;
    const img=document.createElement("img");
    img.setAttribute("alt",movie.title);
    img.setAttribute('src','https://image.tmdb.org/t/p/w300'+movie.poster_path);
    const h3=document.createElement("h3");
    h3.innerHTML=movie.title;
    const p=document.createElement("p");
    p.innerHTML=movie.overview;
    div.appendChild(span);
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    moviesByClasification.appendChild(div);
  })
 

  
  
}

async function getMovieBySearch(query){
  const {data} =await API('search/movie',{
    params:{
       query:query
    },
  });
  const movies=data.results;
  
   section_title.innerHTML='Resultados '
  createMovies(moviesByClasification,movies)
 
}

async function getTrendingMovies(){
  const {data}= await API('trending/movie/day')
  const movies=data.results;
  section_title.innerHTML='Peliculas en tendencia'
  createMovies(moviesByClasification,movies)
 
}
async function getPopularMovies(){
  const {data}=await API('/movie/popular')
  const movies=data.results;
  section_title.innerHTML='Populares'
  createMovies(moviesByClasification,movies)
 
}

async function getUpcommingMoviesPreview(){
  const {data}=await API('/movie/upcoming');
  const movies=data.results;
  commingSoon.innerHTML="";
  movies.map(movie=>{
   
    const div=document.createElement("div");
    div.classList.add("commingSoon-container");
    div.classList.add("container");
    const img=document.createElement("img");
    img.setAttribute("alt",movie.title);
    img.setAttribute("src",'https://image.tmdb.org/t/p/w300/'+movie.poster_path);
   
    const p=document.createElement("p");
    p.innerText=movie.original_title;
    div.appendChild(img)
    div.appendChild(p);
   
    commingSoon.appendChild(div);
    
  })

}
async function getTopRatedMovies(){
  const {data}=await API('/movie/top_rated');
  const movies=data.results
  console.log(movies)
 
  topRatedMovies.innerHTML="";
  movies.map(movie=>{
    const div=document.createElement("div");
    div.classList.add("topMovie-container");
    const img=document.createElement("img");
    img.setAttribute("alt",movie.title);
    img.setAttribute("src","https://image.tmdb.org/t/p/original"
    +movie.backdrop_path);
    const p=document.createElement("p");
    const pText=document.createTextNode(movie.title);
    p.appendChild(pText);
    div.appendChild(img);
    div.appendChild(p);
    topRatedMovies.appendChild(div);
  })

}


function createMovies(container,movies){
  container.innerHTML="";


  movies.map(movie=>{
    if(movie.poster_path!=null && movie.adult===false){
    const div=document.createElement("div");
    div.classList.add("movieByCategoryContainer");
    const span=document.createElement("span");
    span.innerHTML='Calificación '+movie.vote_average;
    const img=document.createElement("img");
    img.setAttribute("alt",movie.title);
    img.setAttribute('src','https://image.tmdb.org/t/p/original'+movie.poster_path);
    const h3=document.createElement("h3");
    h3.innerHTML=movie.title;
    const p=document.createElement("p");
    if(movie.overview!=""){
      p.innerHTML=movie.overview;
    }else{
      p.innerHTML="No cuenta con descripción disponible, lo sentimos!"
    }
   
    div.appendChild(span);
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    container.appendChild(div);
    }
    
})
}

