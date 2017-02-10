// wait until DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  'use strict'
  //  Listen for search submittal
  document.querySelector('#search-button').addEventListener("click", function(e){
    let title = document.getElementById("movie-title").value;
    const BASE_URL = 'http://www.omdbapi.com/?s=';
    let searchString = BASE_URL + title.split(' ').join('+');

    getData(searchString, listMovies);
  });

  // Listen for click on Favorites link
  document.querySelector('.favorite-link').addEventListener("click", function() {
    const FAV_URL = '/favorites';
    getData(FAV_URL, listFavorites);
  });

  // Lists the search result as links in the target div
  function listMovies(searchResp) {
    const resultContainer = document.querySelector(".search-results");
    // clear any prior search content
    document.querySelector("#movie-title").value = '';
    resultContainer.innerHTML = '';

    let results = searchResp.Search;
    for ( let i = 0; i < results.length; i++) {
      let movieTitle = results[i].Title;
      let titleString = `<a href="#" id="movie-title-${i}">${movieTitle}</a>`;
      resultContainer.insertAdjacentHTML('beforeend', titleString);

      // Fire a details modal when a result link is clicked
      resultContainer.querySelector(`#movie-title-${i}`).addEventListener("click", function(){
        showModal(results[i])
      });
    }
  }

  // Lists the movies that have been added to the favorites persisted on the server
  function listFavorites(favorites) {
    let favoriteContainer = document.querySelector(".show-favorites");
    favoriteContainer.innerHTML = '';
    favoriteContainer.style.display = 'block';
    favoriteContainer.insertAdjacentHTML('beforeend', '<h3>Favorites</h3>');

    for(let i=0; i < favorites.length; i++) {
      let favorite = favorites[i];
      let titleString = `<p class="title-string">${favorite.Title}</p>`;
      favoriteContainer.insertAdjacentHTML('beforeend', titleString);
    }
    favoriteContainer.insertAdjacentHTML('beforeend', '<button class="close">Close</button>');

    // hide the favorites div when the close button is clicked
    document.querySelector(".close").addEventListener("click", function() {
      favoriteContainer.style.display = 'none';
    });
  }

  // Generates and displays the movie details modal
  function showModal(result) {
      // open and close modal
      let modal = document.querySelector('#movie-details');
      let header = document.querySelector(".modal-header");
      let favButton = document.querySelector("#favorite-button");
      let modalBody = document.querySelector('.modal-body');

      modal.style.display = 'block';
      header.addEventListener("click", function() {
        // clear favorite event listener when modal is closed
        favButton.removeEventListener('click', addFavorite);
        modal.style.display = "none";
      });

      modalBody.innerHTML = '';

      modalBody.insertAdjacentHTML('beforeend', `<img src=${result['Poster']}>`)
      for (let stat in result) {
        let statAttr = `<strong>${stat}:</strong> `;
        let statVal = `<span class="stat-value">${result[stat]}</span>`
        let statString = `<p class="stat-string">${statAttr}${statVal}</p>`;
        modalBody.insertAdjacentHTML('beforeend', statString);
      }

      // event listener to favorite a movie
      let addFavorite = function() {
        postFavorite(result);
        // ugly alert so the user knows the movie was saved
        alert("Saved to Favorites!");
      };
      favButton.addEventListener("click", addFavorite);
    }

  // Fetch API call to get json from omdbiapi or favorites
  function getData(targetURL, resultCallback) {
    fetch(targetURL, {
      method: 'get'
    })
    .then(function(response) {
      return response.json();
    })
    // send the search results to the list generator
    .then(function(jsonData) {
      resultCallback(jsonData);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  // Fetch API call to post a favorite to the server
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
});
