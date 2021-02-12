import React, { useContext } from 'react';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { GoogleAuthContext } from '../../GoogleContext';

function Login() {
  const { setUserId } = useContext(GoogleAuthContext);
  // const { signIn, loaded } = useGoogleLogin({
  //     isSignedIn: true,
  //     onSuccess: responseGoogle,        
  // }) // what is it for?

  const responseGoogle = (response) => {
    setUserId(response.googleId);
  }

  return (
    <GoogleLogin
      clientId="42810455163-tpluvult9gfakcssaeq34qidf5t5th7b.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export { Login };
