# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Description
This is the Angular version of the client-side for the myFlix project, built based on its existing server-side code (REST API and MongoDB database). It is a single-page application that contains function components and utilizes state routing to navigate between views. It offers users the ability (after registering and logging in) to view movie details, add and remove movies from their favorites list, update their user information, and delete their account.

## Technologies Used
* Angular - JavaScript framework
* Angular Material - UI component library, implementing Google's Material Design
* TypeDoc - documentation generator for TypeScript code

## Hosted App
* Hosted on GitHub: https://yuxu1.github.io/myFlix-Angular-client/welcome

## Source API
* Code Repository: https://github.com/yuxu1/movie_api
* Hosted on Heroku: https://my-flix-project-b74d36752ec6.herokuapp.com/

## Views
### Welcome View
* Allows new users to register through the user registration form component
* Allows registered users to login using a username and password through the login form component

### Movies View
* Displays all movies in database (each displayed in its own movie card)
* Allows user to click a button to see movie sypnosis, director details, and genre details in their own popup dialogs
* Allows user to click a button to add or remove a movie to/from their favorites
* Allows user to logout or navigate to their profile through the navigation bar
  
### Profile View
* Displays logged in user's details (username, birthday, registered email, and favorited movies)
* Allows user to update their information (username, email, birthday, and/or password)
* Allows user to remove a movie from their list of favorites
* Allows user to delete their account


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
