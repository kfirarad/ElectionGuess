import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { GoogleAuthContext } from '../../GoogleContext';

function Logout() {
  const { setUserId } = useContext(GoogleAuthContext);

  const logout = () => {
    setUserId(null);
  }

  return (
    <GoogleLogout
      clientId="264486690240-pnrodjvjbqifgo5qei695au6edd522re.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
     />
  );
}

export { Logout };
