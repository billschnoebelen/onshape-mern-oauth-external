import React, { useState } from "react";
import axios from "axios";
import { useUserContext } from "../Auth/UserContext";

export default function UserUnits() {
  const [profile, setProfile] = useState([]);

  const { user, getAccessToken } = useUserContext();
  const { os_id } = user;
  const accessToken = getAccessToken();

  // console.log("user", user);
  // console.log("os_id", os_id);

  const os_url = `https://cad.onshape.com/api/users/${os_id}/settings?includematerials=false`;

  const url = "http://localhost:4000/endpoint";

  const data = {
    authorization: `${accessToken}`,
    os_url: os_url,
  };

  const getUserUnits = () => {
    (async () => {
      await axios
        .post(url, data)
        .then((response) => {
          // console.log(response)
          setProfile(response.data.defaultUnits.units);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    })();
  };

  return (
    <div>
      <div>
        <p>accessToken: {accessToken}</p>
      </div>
      <button className="big_button" type="button" onClick={getUserUnits}>
        Get user units
      </button>
      <div>
        <table border="1" align="center">
          <tbody>
            {profile.map((d) => (
              <tr key={d.key}>
                <td>{d.key}: </td>
                <td>{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
