// wait until DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  //  Listen for search submittal
  document.querySelector('#search-button').addEventListener("click", function(e){
    var title = document.getElementById("movie-title").value;
    var BASE_URL = 'http://www.omdbapi.com/?s=';
    var searchString = BASE_URL + title.split(' ').join('+');

    getMovie(searchString);
  });

  document.querySelector('.favorite-link').addEventListener("click", function() {
    getFavorites();
  });

  function listMovies(searchResp) {
    var resultContainer = document.querySelector(".search-results");
    document.querySelector("#movie-title").value = '';
    resultContainer.innerHTML = '';

    var results = searchResp.Search;
    for ( let i = 0; i < results.length; i++) {
      let movieTitle = document.createTextNode(results[i].Title);

      var titleLink = makeLink(movieTitle, i);
      resultContainer.appendChild(titleLink).addEventListener("click", function(){
        showModal(results[i])
      });
    }
  }

  function listFavorites(favorites) {
    let favoriteContainer = document.querySelector(".show-favorites");
    // document.querySelector("#movie-title").value = '';
    // console.log(favorites);
    favoriteContainer.innerHTML = '';
    favoriteContainer.style.display = 'block';

    for(let i=0; i < favorites.length; i++) {
      let favorite = favorites[i];
      let titleString = `<p class="title-string">${favorite.Title}</p>`;
      favoriteContainer.insertAdjacentHTML('beforeend', titleString);
    }
    favoriteContainer.insertAdjacentHTML('beforeend', '<button class="close">Close</button>');

    document.querySelector(".close").addEventListener("click", function() {
      favoriteContainer.style.display = 'none';
    });
  }


  function showModal(result) {
    let modalBody = document.querySelector('.modal-body');
    // let favorites = [];
    modalBody.innerHTML = '';

    modalBody.insertAdjacentHTML('beforeend', `<img src=${result['Poster']}>`)
    for (let stat in result) {
      let statAttr = `<strong>${stat}:</strong> `;
      let statVal = `<span class="stat-value">${result[stat]}</span>`
      let statString = `<p class="stat-string">${statAttr}${statVal}</p>`;
      modalBody.insertAdjacentHTML('beforeend', statString);
    }

    document.querySelector("#favorite-button").addEventListener("click", function() {
      postFavorite(result);
    });

    // open and close modal
    let modal = document.getElementById('movie-details');
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = 'block';
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
    }
  }

  function getMovie(searchString) {
    fetch(searchString, {
      method: 'get'
    })
    .then(function(response) {
      // console.log(response);
      return response.json();
    })
    .then(function(searchResp) {
      listMovies(searchResp);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  function getFavorites() {
    fetch('/favorites', {
      method: 'get'
    })
    .then(function(response) {
      // console.log(response);
      return response.json();
    })
    .then(function(favorites) {
      console.log(favorites);
      listFavorites(favorites);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  function postFavorite(movie) {
    fetch('/favorites', {
      method: 'post',
      headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify(movie)
    })
    .then(function (data) {
      console.log('Request success: ', data);
    })
    .catch(function (error) {
      console.log('Request failure: ', error);
    });
  }


  function makeLink(linkText, index) {
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("id", `movie-title-${index}`);
    link.appendChild(linkText);
    return link;
  }

  // function movieData(movie) {
  //   return {
  //     poster: movie.Poster,
  //     title: movie.Title,
  //     type: movie.Type,
  //     year: movie.Year,
  //     imdbID: movie.imdbID,
  //   };
  // }

});
