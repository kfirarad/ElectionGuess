import React, { useContext } from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { GoogleAuthContext } from '../../GoogleContext';
import configData from "../../config/config.json";

function Logout() {
  const { setUserId } = useContext(GoogleAuthContext);
  // const { signIn, loaded } = useGoogleLogin({
  //     isSignedIn: true,
  //     onSuccess: responseGoogle,        
  // }) // what is it for?

  const logout = () => {
    setUserId(null);
  }

  return (
    <GoogleLogout
      clientId={configData.google.clientId}
      buttonText="Logout"
      onLogoutSuccess={logout}
     />
  );
}

export { Logout };
