
  <p align="left">
    A MERN Stack app which uses Oauth2 to login to Onshape. There are two simple examples to retrieve data. 
    <ol>
    <li>Get user units.</li>
    <li>Get a gltf of an assembly.</li>
    </ol>
  </p>
  
  <p>
  This consist of both a frontend react client and a backend express node server. Mongo is used to keep track of session data. In production, these are run from a server. This, however, is setup to all run locally.
  </p>

  <p>
  Onshape is used for Authentication . Based on the Authentication , the react-router handles the Authorization and routes the user to the appropriate route. <b>This is a very simple example and should not be used for production.</b>
  </p>

  <p>
  More info: https://docs.google.com/document/d/1LOu7EGSaq0INMa6WeeXJHs7M6eNUR1J8L1oabaFkexg/edit?usp=sharing
  </p>

<br />
<br />

<!-- PREREQUISITES -->

## Prerequisites

- [VS Code](https://code.visualstudio.com/)
- [Node](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)

<!-- BUILT WITH -->

## Built With

- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [NodeJs](https://nodejs.org/en/)

<!-- GETTING STARTED -->

## Getting Started

Instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

<!-- USAGE EXAMPLES -->

## Usage

Use this as a template to create your own external Onshape app using the MERN Stack.

## Required

A .env file is require at the root of the client and server.

### Client .env

```
REACT_APP_OS_OAUTH_CLIENT_KEY=<OS_OAUTH_CLIENT_KEY>
```

### Server .env

```
PORT=4000
NODE_ENV=DEVELOPMENT
APP_NAME=onshape-mern-oauth-external
SESSION_SECRET=godtac
OS_OAUTH_CLIENT_KEY=<OS_OAUTH_CLIENT_KEY>
OS_OAUTH_SECRET_KEY=<OS_OAUTH_SECRET_KEY>
OS_OAUTH_REDIRECT_URL=http://localhost:4000/oauthRedirect
OS_OAUTH_AUTHORIZATION_URL=https://oauth.onshape.com/oauth/authorize
OS_OAUTH_TOKEN_URL=https://oauth.onshape.com/oauth/token
OS_OAUTH_USER_PROFILE_URL=https://cad.onshape.com/api/users/sessioninfo
JWT_ACCESS_SECRET=ad4d5548a61ad283abf3f89d361b79b18a37a69970610150ffb2895917f2b71bea
```


<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
