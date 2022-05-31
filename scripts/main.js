const BASE_URL='https://api.themoviedb.org/3/';

async function getTrendingMoviesPreview(){
  const movieContainer=document.querySelector(".new");
  const response= await fetch(BASE_URL+'trending/movie/day?api_key='+API_KEY+'&language=es');
  const data= await response.json();
  const movies=data.results;
  movies.map(movie=>{
    console.log( movie)
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
 
}getTrendingMoviesPreview()