// wait until DOM is loaded
document.addEventListener("DOMContentLoaded", function() {

  //  Listen for search submittal
  document.querySelector('#search-button').addEventListener("click", function(e){
    var title = document.getElementById("movie-title").value;
    var BASE_URL = 'http://www.omdbapi.com/?s=';
    var searchString = BASE_URL + title.split(' ').join('+');

    getMovie(searchString);
  });

  function getMovie(searchString) {
    var resultContainer = document.querySelector(".search-results");

    fetch(searchString, {
      method: 'get'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(searchResp) {
      document.querySelector("#movie-title").value = '';
      resultContainer.innerHTML = '';

      var results = searchResp.Search;
      console.log(results);
      for ( i = 0; i < results.length; i++) {
        var titleParagraph = document.createElement("p");
        var movie = document.createTextNode(results[i].Title);
        titleParagraph.appendChild(movie);
        console.log(titleParagraph);
        resultContainer.appendChild(titleParagraph);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  }

});
