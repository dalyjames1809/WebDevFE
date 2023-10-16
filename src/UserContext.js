import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [userToken, setUserToken] = useState(null);

  return (
    <UserContext.Provider value={{ username, setUsername, userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
