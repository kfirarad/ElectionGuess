import React, { useState } from 'react';

const GoogleAuthContext = React.createContext();

function GoogleAuthContextProvider(props) {
  const [userId, setUserId] = useState(undefined);

  return (
    <GoogleAuthContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </GoogleAuthContext.Provider>
  )
}

export { GoogleAuthContext, GoogleAuthContextProvider };
