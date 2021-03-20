import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleAuthContext } from '../../GoogleContext';
import { db } from '../../firebase/firebase';
import configData from "../../config/config.json";

function Login() {
  const { setUserId } = useContext(GoogleAuthContext);

  const responseGoogle = async (response) => {
    const userId = response.googleId;
    setUserId(userId);
    db.collection('members').doc(userId).set({
      name: response.profileObj.name,
      mail: response.profileObj.email,
    });
  }

  return (
    <GoogleLogin
      clientId={configData.google.clientId}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export { Login };
