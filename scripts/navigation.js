let page = 1;
let MaxPages;
// localStorage.setItem('tutorial',true);
let showTutorial=localStorage.getItem('tutorial');
console.log(showTutorial);
//creating function to detecte the page location

//agregando evento tanto a la imagen de busqueda como al enter del searcher
header_links__search.addEventListener('click', () => {
    const busqueda = header_searcher__input.value;
    location.hash = '#search=' + busqueda;
    header_searcher__input.value = "";



})

header_searcher__input.onkeyup = (e) => {

    if (e.keyCode === 13) {
        const busqueda = header_searcher__input.value;
        location.hash = '#search=' + busqueda;
        header_searcher__input.value = "";
    }


}
function navigator() {
    if((showTutorial!='false' || showTutorial==null) && location.hash.startsWith('#home')){
       const div=document.createElement("div");
       div.classList.add("tutorial-div");

       const img=document.createElement("img");
       img.setAttribute("src",'https://cdn1.iconfinder.com/data/icons/hawcons/32/699015-icon-29-information-128.png');
       img.classList.add("tutorial-div--img");
       div.appendChild(img);

       const span=document.createElement("span");
       const spanText=document.createTextNode("1.Da click en cada película para ver su calificación y descripción"+" 2.Puedes guardar tus películas favoritas en tu lista de favoritas dando like '❤️' o sacarlas dando don´t like'👎' en cada una de ellas "+ 
       "3.Puedes filtrar las películas por categoria llendo al final de la página y eligiendo la categoria que deseas ver "+
       "4.Tambien puedes buscar tu película por nombre utilizando el buscador y dando enter o click en la imagen de la lupa");
       span.appendChild(spanText);
       div.appendChild(span);

       const exitButton=document.createElement("button");
       exitButton.classList.add("tutorial-div--button");
       exitButton.innerText="Cerrar";
       div.appendChild(exitButton);

       const dontShowAgainButton=document.createElement("button");
       dontShowAgainButton.classList.add("tutorial-div--button");
       dontShowAgainButton.innerText="No mostrar de nuevo";
       div.appendChild(dontShowAgainButton);

       studios.appendChild(div);

       exitButton.onclick=()=>{
         div.style.display='none';
       }
       dontShowAgainButton.onclick=()=>{
       
        localStorage.setItem('tutorial',false);
        div.style.display='none';
        
       }
    }

    if (location.hash.startsWith('#search=')) {
        searchPage()
    }
    else if (location.hash.startsWith('#movie=')) {
        moviePage()
    }
    else if (location.hash.startsWith('#category=')) {
        categoryPage()
    }
    else if (location.hash.startsWith('#popular')) {
        popularMovies()
    }
    else if (location.hash.startsWith('#tendencias')) {
        trendingMovies()

    }
    else if (location.hash.startsWith('#home')) {
        homePage();
    }

    //to avoid botton scroll when change location.hash
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function moviePage() {
    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    favouritesContainer.classList.add("hidden");


    classificationsContainer.classList.add("hidden");
    moviesByClasificationContainer.classList.remove("hidden");
    movieDetailContainer.classList.remove("hidden");

    const URL = location.hash.split("=")
    getMovieById(URL[1]);
}
function popularMovies() {
    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    classificationsContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");
    favouritesContainer.classList.add("hidden");


    moviesByClasificationContainer.classList.remove("hidden");

    getPopularMovies()
}

function homePage() {
    getTrendingMoviesPreview()
    categoriesPreview()
    getUpcommingMoviesPreview()
    getTopRatedMovies()
    getLikedMovies();
    // showing sections
    newMovies.classList.remove("hidden");
    studios.classList.remove("hidden");
    newContainer.classList.remove("hidden");
    classificationsContainer.classList.remove("hidden");
    commingSoonContainer.classList.remove("hidden");
    favouritesContainer.classList.remove("hidden");

    moviesByClasificationContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");

}
function categoryPage() {
    classificationsContainer.classList.remove("hidden");
    moviesByClasificationContainer.classList.remove("hidden");

    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");
    favouritesContainer.classList.add("hidden");
    //getting the selected category id and name
    let url = location.hash.split('=')
    url = url[1].split('-')
    let id = url[0]
    let name = url[1]

    getMoviesBycategory(id, name)
}
function searchPage() {
    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    classificationsContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");
    favouritesContainer.classList.add("hidden");


    moviesByClasificationContainer.classList.remove("hidden");
    const url = location.hash.split('=');
    const query = url[1];

    getMovieBySearch(query)

}

function trendingMovies() {

    newMovies.classList.add("hidden");
    studios.classList.add("hidden");
    newContainer.classList.add("hidden");
    favouritesContainer.classList.add("hidden");

    classificationsContainer.classList.add("hidden");
    commingSoonContainer.classList.add("hidden");
    movieDetailContainer.classList.add("hidden");

    moviesByClasificationContainer.classList.remove("hidden");

    getTrendingMovies();

}

window.addEventListener('hashchange', navigator, false);
window.addEventListener('load', navigator, false);
window.addEventListener('scroll', getPaginatedMovies, { passive: false });


