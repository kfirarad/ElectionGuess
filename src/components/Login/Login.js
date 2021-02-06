import React from 'react';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
  }

function Login(){
    const { signIn, loaded } = useGoogleLogin({
        isSignedIn: true,
        onSuccess: responseGoogle,        
    })
    console.log(signIn);
    return (<GoogleLogin
        clientId="42810455163-tpluvult9gfakcssaeq34qidf5t5th7b.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />);
}

export default Login