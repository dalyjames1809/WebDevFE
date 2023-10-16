import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [name, setName] = useState(null);
  const [userID, setUserID] = useState(null);

  return (
    <UserContext.Provider value={{ username, setUsername, userToken, setUserToken, name, setName, userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
