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
  section.innerHTML="";
 categories.map(category=>{
   const a=document.createElement("a");
   a.classList.add("classifications-link");
   const h3=document.createElement("h3");
   h3.classList.add("id",category.id)
   h3.innerText='>'+category.name;
   a.appendChild(h3)
   section.appendChild(a);
 })

}


