import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleAuthContext } from '../../GoogleContext';
import { db } from '../../firebase/firebase';

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
      clientId="264486690240-pnrodjvjbqifgo5qei695au6edd522re.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export { Login };
