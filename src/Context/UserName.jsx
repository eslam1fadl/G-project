import { createContext, useState, useEffect } from "react";

export const UserName = createContext(null);
export default function UserNameProvider({ children }) {
  let [isUser, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('name'))
      setUser(localStorage.getItem('name'));
  }, []);

  return (
    <UserName.Provider value={{ isUser, setUser }}>
      {children}
    </UserName.Provider>
  );
}
