  <!-- <h3 align="center">Social</h3> -->

  <p align="left">
    A MERN Stack app which uses Oauth2 to login to Onshape. There are two simple examples to retrieve data. 
    <ol>
    <li>Get user units.</li>
    <li>Get a gltf of an assembly.</li>
    </ol>

  </p>

<br />
<br />

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- BUILT WITH -->

## Built With

- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [NodeJs](https://nodejs.org/en/)
- [Axios](https://axios-http.com/)


<!-- GETTING STARTED -->

## Getting Started

Instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a Mongo URI from [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/utsavk28/Social
   ```
3. Install NPM packages
   ```sh
   cd client && npm install
   ```
   ```sh
   cd server && npm install
   ```
4. Enter your Mongo URI and JWT Secret Token in `server/config/default.json`
   ```JSON
   {
   	"mongoURI": "mongodb+srv://user:pass@cluster10.uxypi.mongodb.net/test?retryWrites=true&w=majority",
   	"jwtSecret": "token"
   }
   ```

<!-- USAGE EXAMPLES -->

## Usage

Use this as a template to create your own external Onshape app.


<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
