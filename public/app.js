// wait until DO is loaded
document.addEventListener("DOMContentLoaded", function() {

  //  Listen for form submit
  document.querySelector('#search-form').addEventListener("submit", function(e){
    e.preventDefault();
    var title = document.getElementById("movie-title").value;
    var BASE_URL = 'http://www.omdbapi.com/?';
    var searchString = BASE_URL + title.split(' ').join('+');
    console.log(searchString);
  });

  fetch('')

});
