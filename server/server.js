require("dotenv").config();
const path = require("path");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const axios = require("axios");
const MongoStore = require("connect-mongo");

const express = require("express");
const session = require("express-session");
// Parse incoming request bodies in a middleware before your handlers
const bodyParser = require("body-parser");

const passport = require("passport");
const OnshapeStrategy = require("passport-onshape");

const app = express();

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.set("trust proxy", 1); // To allow to run correctly behind Heroku

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/onshape-mern-oauth-external",
    }),
    cookie: {
      name: process.env.APP_NAME,
      sameSite: "none",
      secure: true,
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new OnshapeStrategy(
    {
      clientID: process.env.OS_OAUTH_CLIENT_KEY,
      clientSecret: process.env.OS_OAUTH_SECRET_KEY,
      callbackURL: process.env.OS_OAUTH_REDIRECT_URL,
      authorizationURL: process.env.OS_OAUTH_AUTHORIZATION_URL,
      tokenURL: process.env.OS_OAUTH_TOKEN_URL,
      userProfileURL: process.env.OS_OAUTH_USER_PROFILE_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      return done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

const corsWhiteList = ["http://localhost:3000"];

app.use(function (req, res, next) {
  //console.log("header called");
  res.header("Access-Control-Allow-Origin", corsWhiteList);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("public"));

// not currently used
app.use(
  "/oauthSignin",
  (req, res) => {
    const state = {};
    req.session.state = state;
    return passport.authenticate("onshape", { state: uuid.v4(state) })(
      req,
      res
    );
  },
  (req, res) => {
    /* redirected to Onshape for authentication */
  }
);

app.use(
  "/oauthRedirect",
  passport.authenticate("onshape", { failureRedirect: "/grantDenied" }),
  (req, res) => {
    // may need some error handling here? verify against database?

    // Prints everything
    // console.log("\n", "\n");
    // console.log(req.session.passport);
    // console.log(req.session);
    // console.log("\n", "\n");

    // build jason
    const os_id = req.session.passport.user.id;
    // console.log(os_id);
    const displayName = req.session.passport.user.displayName;
    // console.log(displayName);
    const image = req.session.passport.user._json.image;
    // console.log(image);
    const accessToken = req.session.passport.user.accessToken;
    // console.log(accessToken);
    const refreshToken = req.session.passport.user.refreshToken;
    // console.log(refreshToken);

    userJson = {
      os_id: os_id,
      displayName: displayName,
      image: image,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    const token = jwt.sign(userJson, process.env.JWT_ACCESS_SECRET);
    // console.log("token", token)

    res.redirect(`http://localhost:3000/user/${token}`);
    // res.redirect(`/?documentId=${req.session.state.docId}&workspaceId=${req.session.state.workId}&elementId=${req.session.state.elId}`);
  }
);

//

app.post("/endpoint", async (req, res, next) => {
  console.log("endpoint called");

  // console.log("data", req.session.cookie);

  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }

  console.log(req.session.viewCount);

  const authorization = req.body.authorization;
  const os_url = req.body.os_url;

  const headers = {
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  // console.log("headers", headers);

  var msg = "";

  const data = await getEndpoint(os_url, headers);
  res.json(data);
});

const getEndpoint = async (urlEndpoint, headers) => {
  // console.log("urlEndpoint", urlEndpoint);
  // console.log("headers", headers);

  return await axios
    .get(urlEndpoint, headers)
    .then((response) => {
      // console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      msg = `There was an error in your call to ${urlEndpoint}!: ${JSON.stringify(
        error.response.data
      )}`;
      console.error(msg);
      return { msg: msg };
    });
};

const postEndpoint = async (urlEndpoint, headers, body) => {
  // console.log("urlEndpoint", urlEndpoint);
  // console.log("headers", headers);

  return await axios
    .post(urlEndpoint, body, headers)
    .then((response) => {
      // console.log(response)
      return response.data;
    })
    .catch((error) => {
      msg = `There was an error in your call to ${os_url}!: ${JSON.stringify(
        error.response.data
      )}`;
      console.error(msg);
      return { msg: msg };
    });
};

app.post("/getGltf", async (req, res, next) => {
  console.log("getGltf called");

  // console.log("req.body", req.body);

  const authorization = req.body.authorization;
  const did = req.body.did;
  const wid = req.body.wid;
  const eid = req.body.eid;

  // console.log("authorization", authorization);
  // console.log("did", did);
  // console.log("wid", wid);
  // console.log("eid", eid);

  // check if it is an assembly

  const headers = {
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  // Verify this is an assembly

  const assemblyCheckURL = `https://cad.onshape.com/api/documents/d/${did}/w/${wid}/elements?elementType=&elementId=${eid}&withThumbnails=false`;

  const elementData = await getEndpoint(assemblyCheckURL, headers);
  // console.log("elementData", elementData)
  const elementType = elementData[0].elementType;
  console.log("elementType:", elementType);

  if (elementType !== "ASSEMBLY") res.error({ msg: "Url was not an assembly" });

  // Initialize gltf

  // https://cad.onshape.com/api/assemblies/d/<did>/w/<wid>/e/<eid>/translations

  const initializeGltfURL = `https://cad.onshape.com/api/assemblies/d/${did}/w/${wid}/e/${eid}/translations`;

  const body = {
    includeExportIds: false,
    formatName: "GLTF",
    flattenAssemblies: false,
    yAxisIsUp: false,
    triggerAutoDownload: false,
    storeInDocument: false,
    connectionId: "",
    versionString: "",
    grouping: true,
    destinationName: "",
    configuration: "default",
    cloudStorageAccountId: null,
    emailLink: false,
    emailTo: null,
    emailSubject: null,
    emailMessage: null,
    sendCopyToMe: null,
    passwordRequired: null,
    password: null,
    validForDays: null,
    fromUserId: null,
    resolution: "medium",
    distanceTolerance: 0.00012,
    angularTolerance: 0.1090830782496456,
    maximumChordLength: 10,
  };

  const initializeGltfData = await postEndpoint(
    initializeGltfURL,
    headers,
    body
  );
  // console.log("initializeGltfData:", initializeGltfData);

  const translationId = initializeGltfData.id;
  // console.log("translationId:", translationId);

  // ping ping ping gltf

  let requestState = "";
  let resultExternalDataId = null;
  while (requestState != "DONE") {
    const translationPingURL = `https://cad.onshape.com/api/translations/${translationId}`;

    const translationStatus = await getEndpoint(translationPingURL, headers);
    // console.log("translationStatus", translationStatus)
    if (translationStatus.resultExternalDataIds !== null) {
      resultExternalDataId = translationStatus.resultExternalDataIds[0];
    }

    requestState = translationStatus.requestState;
    // console.log("requestState:", requestState);
  }

  console.log("resultExternalDataId:", resultExternalDataId);

  // download gltf

  const externalDataURL = `https://cad.onshape.com/api/documents/d/${did}/externaldata/${resultExternalDataId}`;

  const gltf = await getEndpoint(externalDataURL, headers);
  // console.log("gltf", gltf);

  const fileName = `myGltf.gltf`;

  const fs = require("fs");
  fs.writeFileSync(`./public/${fileName}`, JSON.stringify(gltf), {
    flag: "w",
  });

  res.json({ location: `http://localhost:4000/${fileName}` });
});

app.listen(process.env.PORT, () => {
  console.log("Express listening on port", process.env.PORT);
});
