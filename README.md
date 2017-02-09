![GA Logo](https://raw.github.com/generalassembly/ga-ruby-on-rails-for-devs/master/images/ga.png)

## WDI Instructor Code Challenge

### GOAL

> Create a single page application that will utilize an external API to request movie data. The client side application will be served by a back-end which will have the ability to persist data. The page should have a form that uses the [OMDBapi](http://www.omdbapi.com/) to search for matching movies and then display the results. When the user clicks on a search result display detailed information about that movie. Users should be able to "favorite" a movie and have it persisted via the provided back-end. Provide a link to display favorited movies.

#### Deployment

- This application is deployed on [Heroku](http://infinite-shore-67981.herokuapp.com/#)

- To deploy it locally, clone the respository and run:
  - npm install
  - npm start

#### Some Details

- The application is built on Node.js and Vanilla JavaScript.
- The server is built on Express.js
- Favorites data is persisted in a data.json file in the root directory
- The Kickstart CSS library is used to grab some quick styling while avoiding jQuery

#### More to Do
- Add the ability to delete favorites from the data.json file
- Replace favorite saved alert with a more elegant notification
- Add some additional data from omdbapi
- Get full list from omdbapi and paginate (api returns 10 movies by default)
- Add some tests (I know! I know! - I'm working for speed here ;)
- Get the rest of the styling ironed out
- Add a spinner because omdbapi is slowwwww
