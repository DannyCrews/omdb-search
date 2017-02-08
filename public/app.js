// wait until DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  //  Listen for search submittal
  document.querySelector('#search-button').addEventListener("click", function(e){
    var title = document.getElementById("movie-title").value;
    var BASE_URL = 'http://www.omdbapi.com/?s=';
    var searchString = BASE_URL + title.split(' ').join('+');

    getMovie(searchString);

    // function showSpinner() {
    //   loadingDiv.style.visibility = 'visible';
    // }

    // function hideSpinner() {
    //   loadingDiv.style.visibility = 'hidden';
    // }

  });

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
    })
  }

  function listMovies(searchResp) {
    var resultContainer = document.querySelector(".search-results");
    document.querySelector("#movie-title").value = '';
    resultContainer.innerHTML = '';

    var results = searchResp.Search;
    for ( let i = 0; i < results.length; i++) {
      let movieTitle = document.createTextNode(results[i].Title);
      let movieType = document.createTextNode(results[i].Type);
      let movieYear = document.createTextNode(results[i].Year);
      let movieimdbID = document.createTextNode(results[i].imdbID);
      let moviePoster = document.createTextNode(results[i].Poster);

      var titleLink = makeLink(movieTitle, i);
      resultContainer.appendChild(titleLink).addEventListener("click", function(){
        showModal(results[i])
      });
    }
  }

  function showModal(result) {
    var modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = '';
    //
    let movieTitle = document.createTextNode(result.Title);
    let movieType = document.createTextNode(result.Type);
    let movieYear = document.createTextNode(result.Year);
    let movieimdbID = document.createTextNode(result.imdbID);
    let moviePoster = document.createTextNode(result.Poster);
    var modal = document.getElementById('movie-details');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = 'block';
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
    }

    var titleP = modalBody.appendChild(document.createElement('p'))
    titleP.appendChild(movieTitle);

    var movieP = modalBody.appendChild(document.createElement('p'))
    movieP.appendChild(movieType);

    var yearP = modalBody.appendChild(document.createElement('p'))
    yearP.appendChild(movieYear);

    var imdbP = modalBody.appendChild(document.createElement('p'))
    imdbP.appendChild(movieimdbID);

    var posterP = modalBody.appendChild(document.createElement('p'))
    posterP.appendChild(moviePoster);
  }

  function makeLink(linkText, index) {
    var link = document.createElement("a");
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
