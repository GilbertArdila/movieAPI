let page=1;

//creating function to detecte the page location

header_links__search.addEventListener('click',()=>{
    const busqueda=header_searcher__input.value;
    location.hash='#search='+busqueda;
    header_searcher__input.value="";
   
    
    
})
function navigator(){
    
     if(location.hash.startsWith('#search=')){
        searchPage()
    }
    else if(location.hash.startsWith('#movie=')){
        moviePage()
    }
    else if(location.hash.startsWith('#category=')){
        categoryPage()
    }
    else if(location.hash.startsWith('#popular')){
        popularMovies()
    }
    else if(location.hash.startsWith('#tendencias')){
        trendingMovies()
        
    }
    else{
       homePage();
    }
    //to avoid botton scroll when change location.hash
   document.documentElement.scrollTop=0;
   document.body.scrollTop=0;
}

function moviePage(){
    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    classificationsContainer.classList.add("hidden");
    
    moviesByClasificationContainer.classList.remove("hidden");
    movieDetailContainer.classList.remove("hidden");

    const URL=location.hash.split("=")
    getMovieById(URL[1]);
}
function popularMovies(){
    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    classificationsContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");
   
    moviesByClasificationContainer.classList.remove("hidden");
   
    getPopularMovies()
}

function homePage(){
    getTrendingMoviesPreview()
    categoriesPreview()
    getUpcommingMoviesPreview()
    getTopRatedMovies()
    
   
   // showing sections
    newMovies.classList.remove("hidden");
    studios.classList.remove("hidden");
    newContainer.classList.remove("hidden");
    classificationsContainer.classList.remove("hidden");
    commingSoonContainer.classList.remove("hidden");
    moviesByClasificationContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");
    
    

   
}
function categoryPage(){
    classificationsContainer.classList.remove("hidden");
    moviesByClasificationContainer.classList.remove("hidden");

    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");
   
    
    //getting the selected category id and name
    let url=location.hash.split('=')
    url=url[1].split('-')
    let id=url[0]
    let name=url[1]
   
    getMoviesBycategory(id,name)
}
function searchPage(){
    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    classificationsContainer.classList.remove("hidden");
    commingSoonContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");

    moviesByClasificationContainer.classList.remove("hidden");

    const url=location.hash.split('=');
    const query=url[1];
   
    getMovieBySearch(query)
    
}

function trendingMovies(){
   
    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
   
    classificationsContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");
 
    moviesByClasificationContainer.classList.remove("hidden");

     getTrendingMovies();

}

window.addEventListener('hashchange',navigator,false);
window.addEventListener('load',navigator,false);
window.addEventListener('scroll',getPaginatedMovies,{passive:false});