//creating function to detecte the page location
function navigator(){
  

    if(location.hash.startsWith('#trends')){
        trendsPage()
    }
    else if(location.hash.startsWith('#search=')){
        searchPage()
    }
    else if(location.hash.startsWith('#movie=')){
        moviePage()
    }
    else if(location.hash.startsWith('#category=')){
        categoryPage()
    }
    else if(location.hash.startsWith('#myList')){
        myListPage()
    }
    else if(location.hash.startsWith('#peliculas')){
        moviesPage()
    }
    else{
       homePage();
    }
   
}

function homePage(){
    getTrendingMoviesPreview()
    categoriesPreview()
    //showing sections
    // newMovies.classList.remove("hidden");
    // studios.classList.remove("hidden");
    // newContainer.classList.remove("hidden");
    // classificationsContainer.classList.remove("hidden");
    // commingSoonContainer.classList.remove("hidden");
    // //hiddin sections
    // recomendationsContainer.classList.add("hidden");
    // continueWatchingContainer.classList.add("hidden");
    // similarsContainer.classList.add("hidden");

    //temporal
    newMovies.classList.remove("hidden");
    studios.classList.remove("hidden");
    newContainer.classList.remove("hidden");
    classificationsContainer.classList.remove("hidden");
    commingSoonContainer.classList.remove("hidden");
    //hiddin sections
    recomendationsContainer.classList.remove("hidden");
    continueWatchingContainer.classList.remove("hidden");
    similarsContainer.classList.remove("hidden");
    moviesByClasificationContainer.classList.add("hidden");
}


function categoryPage(){
    classificationsContainer.classList.remove("hidden");
    moviesByClasificationContainer.classList.remove("hidden");

    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    recomendationsContainer.classList.add("hidden");
    continueWatchingContainer.classList.add("hidden");
    similarsContainer.classList.add("hidden");
    
    
    //getting the selected category id and name
    let url=location.hash.split('=')
    url=url[1].split('-')
    let id=url[0]
    let name=url[1]
    console.log({
      id,name
    })
    getMoviesBycategory(id,name)
}

function moviePage(){
    console.log("Movie")
}
function searchPage(){
    console.log("Search")
}
function trendsPage(){
    console.log("Trends")
}
function myListPage(){
    //showing sections
    newMovies.classList.remove("hidden");
    studios.classList.remove("hidden");
    recomendationsContainer.classList.remove("hidden");
    continueWatchingContainer.classList.remove("hidden");
    classificationsContainer.classList.remove("hidden");

    //hiddin sections
    newContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    similarsContainer.classList.add("hidden");
    moviesByClasificationContainer.classList.add("hidden");
}
function moviesPage(){
    //showing sections
   
    commingSoonContainer.classList.remove("hidden");
    classificationsContainer.classList.remove("hidden");
    newContainer.classList.remove("hidden");
    studios.classList.remove("hidden");
            //hiddin sections
    newMovies.classList.add("hidden");
    recomendationsContainer.classList.add("hidden");
    continueWatchingContainer.classList.add("hidden");
    similarsContainer.classList.add("hidden");
    moviesByClasificationContainer.classList.add("hidden");

}

window.addEventListener('hashchange',navigator,false);
window.addEventListener('load',navigator,false);