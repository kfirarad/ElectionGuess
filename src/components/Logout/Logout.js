import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { GoogleAuthContext } from '../../GoogleContext';

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
      clientId="42810455163-tpluvult9gfakcssaeq34qidf5t5th7b.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
     />
  );
}

export { Logout };
