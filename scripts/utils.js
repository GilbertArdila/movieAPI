
const language = navigator.language;
let idioma;


//cambiamos lenguaje de acuerdo a la selección del cliente
if (sessionStorage.getItem('lang') === null) {

  langSelector.classList.add("header-searcher-lang--english");
  langSelector.classList.remove("header-searcher-lang--spanish");


} else {
  if (sessionStorage.getItem('lang') === 'en') {
    langSelector.classList.add("header-searcher-lang--english")
    langSelector.classList.remove("header-searcher-lang--spanish")


  }
  if (sessionStorage.getItem('lang') === 'es') {
    langSelector.classList.remove("header-searcher-lang--english")
    langSelector.classList.add("header-searcher-lang--spanish")



  }

}
langSelector.onclick = (e) => {
  e.preventDefault();
  if (langSelector.classList.contains('header-searcher-lang--spanish')) {
    langSelector.classList.remove("header-searcher-lang--spanish");
    langSelector.classList.add("header-searcher-lang--english")
    idioma = 'en'
    sessionStorage.setItem('lang', idioma);
    window.location.reload();
  } else if (langSelector.classList.contains('header-searcher-lang--english')) {
    langSelector.classList.add("header-searcher-lang--spanish");
    langSelector.classList.remove("header-searcher-lang--english")
    idioma = 'es'
    sessionStorage.setItem('lang', idioma);
    window.location.reload();
  }
}

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img');
      entry.target.setAttribute('src', url)
    }
  })

});
const lazyLoaderHref = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img');
      entry.target.setAttribute('href', url)
    }
  })

});
function createMovies(container, movies, clean = true) {
  //por defecto es true para que limpie la página y así evitar doble carga, se declara false para cargar más peliculas
  if (clean) {
    container.innerHTML = "";

  }



  movies.map(movie => {
    if (movie.poster_path != null && movie.adult === false) {
      const div = document.createElement("div");

      div.addEventListener("click", function () {
        location.hash = "#movie=" + movie.id;

      })

      div.classList.add("movieByCategoryContainer");
      const span = document.createElement("span");
      span.innerHTML = 'Calificación ' + movie.vote_average;
      const img = document.createElement("img");
      img.setAttribute("alt", movie.title);
      img.setAttribute('data-img', 'https://image.tmdb.org/t/p/original' + movie.poster_path);
      lazyLoader.observe(img);

      div.appendChild(span);
      div.appendChild(img);
      const likeButton = document.createElement("button");
      likeButton.classList.add("new-container--likeButton")
  
      //verificamos si la película ya está en la lista para ponerle por defecto la clase de new-container--dontLikeButton
      likedMoviesList()[movie.id] ? likeButton.classList.add("new-container--dontLikeButton") : likeButton.classList.add("new-container--likeButton");
       //para poner o quitar el like
    likeButton.addEventListener("click", (e) => {
      e.preventDefault();

      //para agregar  o quitar clase con el click
      likeButton.classList.toggle('new-container--dontLikeButton')
      //agregando pelicula a localStorage
      likeMovie(movie);
      window.location.reload();
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    })
      div.appendChild(likeButton);
      container.appendChild(div);
      
     

     

    }

  })
}
function createPreviewMovies(container, movies) {
  container.innerHTML = "";

  movies.map(movie => {

    const div = document.createElement("div");



    div.classList.add("new-container");
    div.classList.add("container");
    const img = document.createElement("img");
    img.setAttribute("alt", movie.title);
    img.setAttribute("data-img", 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
    lazyLoader.observe(img)

    


    const p = document.createElement("p");
    p.innerText = movie.original_title;



    div.appendChild(img)
    div.appendChild(p);

    container.appendChild(div);

    

    //para poner el hash
    img.addEventListener("click", function () {
      location.hash = "#movie=" + movie.id;
    })

  })
}

//function to create pagination
async function getPaginatedMovies() {
  //obtenemos las medidas del documentElement para validar el scroll
  const { scrollTop,
    clientHeight,
    scrollHeight
  } = document.documentElement;
  //validamos si ya está al final
  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  //checking possible number of pages 
  const isNotLastPage = page < MaxPages;
  //si es true llamamos la nueva página
  if (scrollIsBottom && isNotLastPage) {

    page++;
    const { data } = await API('trending/movie/day', {
      params: {
        page
      }
    })
    const movies = data.results;

    section_title.innerHTML = 'Nuevas películas'
    createMovies(moviesByClasification, movies, false)
  }



}


function createTitles(lang, section_title, spanish, english) {
  if (lang === 'en' || lang === null) {
    section_title.innerText = english
  } else {
    section_title.innerText = spanish
  }
  return section_title;
}

//ponemos acción al goUp
goUp.onclick = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
//mostrando el goUp
window.onscroll = () => {
  const { scrollTop,
    clientHeight,
    scrollHeight
  } = document.documentElement;
  if (scrollTop > clientHeight) {
    goUp.classList.remove("hidden");
  } else {
    goUp.classList.add("hidden");
  }
}

//mostrar términos y sobre nosotros
terms.onclick = () => {
  advises.style.display = 'inline-block'
  const span = document.createElement("span");
  const close = document.querySelector(".close");

  if (lang === 'en' || lang === null) {
    span.classList.remove("terms-spanishText");
    span.classList.remove("aboutUs-spanishText");
    span.classList.remove("aboutUs-englishText");

    span.classList.add("terms-englishText");
  } else {
    span.classList.remove("terms-englishText");
    span.classList.remove("aboutUs-spanishText");
    span.classList.remove("aboutUs-englishText");

    span.classList.add("terms-spanishText");
  }

  advises.appendChild(span)
  close.onclick = () => {
    span.classList.remove("terms-englishText");
    span.classList.remove("terms-spanishText");
    span.classList.remove("aboutUs-spanishText");
    span.classList.remove("aboutUs-englishText");
    advises.style.display = 'none'
  }


}
aboutUs.onclick = () => {
  advises.style.display = 'inline-block'
  const span = document.createElement("span");
  const close = document.querySelector(".close");

  if (lang === 'en' || lang === null) {
    span.classList.remove("terms-spanishText");
    span.classList.remove("terms-englishText");
    span.classList.remove("aboutUs-spanishText");

    span.classList.add("aboutUs-englishText");
  } else {


    span.classList.remove("terms-englishText");
    span.classList.remove("terms-spanishText");
    span.classList.remove("aboutUs-englishText");

    span.classList.add("aboutUs-spanishText");
  }

  advises.appendChild(span)
  close.onclick = () => {
    span.classList.remove("terms-englishText");
    span.classList.remove("terms-spanishText");
    span.classList.remove("aboutUs-spanishText");
    span.classList.remove("aboutUs-englishText");
    advises.style.display = 'none'
  }


}
