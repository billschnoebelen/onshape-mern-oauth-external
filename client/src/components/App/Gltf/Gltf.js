import React, { useState } from "react";
import axios from "axios";
// import "@google/model-viewer/dist/model-viewer-legacy";
import "@google/model-viewer";
import { useUserContext } from "../../Auth/UserContext";

export default function Gltf() {
  const [assemblyUrl, setAssemblyUrl] = useState();
  const [gltf, setGltf] = useState();
  const { getAccessToken } = useUserContext();
  const accessToken = getAccessToken();

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  const url = "http://localhost:4000/getGltf";

  const getGltf = () => {
    setGltf("http://localhost:4000/wait.gltf");

    // Some local validation
    if (!isValidUrl(assemblyUrl)) {
      alert("Not a valid URL!");
      return;
    }

    const urlObject = new URL(assemblyUrl);
    // console.log(urlObject.pathname);
    const urlParts = urlObject.pathname.split("/");
    // console.log("urlParts", urlParts);
    const did = urlParts[2];
    const wid = urlParts[4];
    const eid = urlParts[6];

    // console.log("did", did);
    // console.log("wid", wid);
    // console.log("eid", eid);

    if (did.length !== 24) {
      alert("DID not valid!");
      return;
    }

    if (wid.length !== 24) {
      alert("WID not valid!");
      return;
    }

    if (eid.length !== 24) {
      alert("EID not valid!");
      return;
    }

    const data = {
      authorization: `${accessToken}`,
      did: did,
      wid: wid,
      eid: eid,
    };

    (async () => {
      await axios
        .post(url, data)
        .then((response) => {
          console.log("data", response.data);
          setGltf(response.data.location + "?t" + new Date().getTime()); // date stamp forces a cache refresh
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    })();
  };

  const handleChange = (event) => {
    setAssemblyUrl(event.target.value);

    // console.log("value is:", event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="assemblyUrl">Assembly Url:</label>
        <input
          style={{ marginLeft: "10px", width: "50%" }}
          type="text"
          id="assemblyUrl"
          name="assemblyUrl"
          onChange={handleChange}
          value={assemblyUrl}
        />
        <div>
          <button className="big_button" type="button" onClick={getGltf}>
            Get GLTF
          </button>
        </div>
      </div>
      {gltf && (
        <model-viewer
          style={{
            margin: "auto",
            width: "650px",
            height: "650px",
            borderStyle: "solid",
            borderWidth: "3px",
            borderRadius: "30px",
            borderColor: "hsl(194, 55%, 30%)",
          }}
          src={gltf}
          alt="Gltf modelS"
          auto-rotate
          camera-controls
        ></model-viewer>
      )}
    </div>
  );
}

// src="https://circuit-case-blog.s3-us-west-1.amazonaws.com/SAND-SPIKE/sand-spike-GLTF-Aligned.gltf?"

