  <!-- <h3 align="center">Social</h3> -->

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
  Onshape is used for Authentication . Based on the Authentication , the react-router handles the Authorization and routes the user to the appropriate route. 
  ## H2 This is a very simple example and should not be used for production.
  </p>

  <p>
  More info: https://docs.google.com/document/d/1LOu7EGSaq0INMa6WeeXJHs7M6eNUR1J8L1oabaFkexg/edit?usp=sharing
  </p>

<br />
<br />

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

REACT_APP_OS_OAUTH_CLIENT_KEY=4YSL7T6FNVBW4PED4GMJ6ZYWRHJMDWHVTWL2BEY=

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
