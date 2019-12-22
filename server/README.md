# Inscribed RESTful API

API endpoints: https://inscribed-api.herokuapp.com

Wep application: https://inscribed.herokuapp.com

* NOTE: If you are using Safari browser, make sure to switch off cross site tracking as it prevents user log in from functioning properly. This occurs due to free hosting limitations, as the API is not a sub-domain, instead it's hosted separately.

## Introduction
RESTful API for a note-taking web application. It handles all kinds of note management and user authentication using Node.js, Express, MongoDB & JSON Web Tokens.
Link for the Front-End repository:
https://github.com/AndrewAmgad/Inscribed-Back-End

## Features
* Endpoints for creating, editing, archiving, deleting notes as well as creating & signing in users.
* Uses MongoDB as the main database and Redis as an in-memory data store.
* JSON Web Tokens are used to handle user authentications, sent to the client as an HTTP-Only, secure cookie.
* Redis is used to blacklist/invalidate tokens on log out or in case of a breach.

## Author
Andrew Amgad,
andrewamgad30@gmail.com

