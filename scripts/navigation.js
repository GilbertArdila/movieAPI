//creating function to detecte the page location
function navigator(){
    console.log({
        location
    })

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
}


function categoryPage(){
    console.log("Categories")
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

}

window.addEventListener('hashchange',navigator,false);
window.addEventListener('load',navigator,false);