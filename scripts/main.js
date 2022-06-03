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

    div.addEventListener("click",function(){
      location.hash="#movie="+movie.id;
    })

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
  createPreviewMovies(section,categories);

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
  
   section_title.innerHTML='Resultados '
  createMovies(moviesByClasification,movies)
 
}

async function getTrendingMovies(){
  const {data}= await API('trending/movie/day')
  const movies=data.results;
  section_title.innerHTML='Nuevas películas'
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
  section_title.innerHTML="Proximamente"
  movies.map(movie=>{
   
    const div=document.createElement("div");

    div.addEventListener("click",function(){
      location.hash="#movie="+movie.id;
      
    })

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
      
      img.setAttribute("src","https://image.tmdb.org/t/p/original"
    +movie.poster_path);
      
    }else{
    img.setAttribute("src","https://image.tmdb.org/t/p/original"
    +movie.backdrop_path);
    }
    const p=document.createElement("p");
    const pText=document.createTextNode(movie.title);
    p.appendChild(pText);
    div.appendChild(img);
    div.appendChild(p);
    topRatedMovies.appendChild(div);

    
  })

}

async function  getMovieById(id){
  //has not an array as an answer
  const {data:movie}= await API('movie/'+id)
  console.log(movie)
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
    if(movie.backdrop_path===null){
      img.setAttribute('src','https://image.tmdb.org/t/p/original'+movie.poster_path);
    }else{
      img.setAttribute('src','https://image.tmdb.org/t/p/original'+movie.backdrop_path);
    }
    
    
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
  section_title.innerText='Recomendadas'
  //checking if there is not related movies
  if(movies.length<=0){
    section_title.innerText='Lo sentimos no tenemos recomendaciones para este título'

  }else{
  createMovies(moviesByClasification,movies)
  }
}

//functions to create movies
function createMovies(container,movies){
  container.innerHTML="";


  movies.map(movie=>{
    if(movie.poster_path!=null && movie.adult===false){
    const div=document.createElement("div");

    div.addEventListener("click",function(){
      location.hash="#movie="+movie.id;
      
    })

    div.classList.add("movieByCategoryContainer");
    const span=document.createElement("span");
    span.innerHTML='Calificación '+movie.vote_average;
    const img=document.createElement("img");
    img.setAttribute("alt",movie.title);
    img.setAttribute('src','https://image.tmdb.org/t/p/original'+movie.poster_path);
    
   
    div.appendChild(span);
    div.appendChild(img);
   
    container.appendChild(div);
    }
    
})
}
function createPreviewMovies(container,movies){
 
  movies.map(movie=>{
   
    const a=document.createElement("a");

    a.addEventListener("click",function(){
      location.hash="#movie="+movie.id;
      
    })

    a.classList.add("classifications-link");
    a.setAttribute("href",'#category='+movie.id+'-'+movie.name)
    const h3=document.createElement("h3");
    h3.classList.add("id",movie.id)
    h3.innerText='>'+movie.name;
    a.appendChild(h3)
    container.appendChild(a);
  })
}
