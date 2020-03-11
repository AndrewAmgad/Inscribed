# Inscribed
https://inscribed.herokuapp.com/

## Introduction
- A note-taking web application, serves the purpose of writing down notes & seperating them into several folders. The front-end is built using React.js & Redux and the back-end uses Node.js, Express and MongoDB. 

- The overall design of this web application is mainly inherited from Google Keep.

## Front-End Features

* User sign up & sign in by handling JWT's
* Create, edit, archive & delete notes
* Pin notes to the top of the page
* Split the notes to separate folders as desired
* Change the color of the note to make it more recognizable
* Search for notes using the top search bar
* The ability to switch between dark & light mode
* Blazing fast UI by keeping API requests and page refreshes to minimum
* Minimal and simple design for ease of usage 
* Responsive design & mobile support

## Back-End Features
* Endpoints for creating, editing, archiving, deleting notes as well as creating & signing in users.
* Uses MongoDB as the main database and Redis as an in-memory data store.
* OAuth using Google API
* JSON Web Tokens are used to handle user authentications, sent to the client as an HTTP-Only, secure cookie.
* Redis is used to blacklist/invalidate tokens on log out or in case of an account breach.

## Author
Andrew Amgad,
andrewamgad30@gmail.com
