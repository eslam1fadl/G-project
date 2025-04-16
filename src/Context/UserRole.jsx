import { createContext, useState, useEffect } from "react";
export const UserRole = createContext(null);

export default function UserRoleProvider({ children }) {
  const [isRole, setIsRole] = useState(null);
  
  useEffect(() => {
    if (localStorage.getItem('role')) {
      setIsRole(localStorage.getItem('role'));
    }
  }, []);
  
  return (
    <UserRole.Provider value={{ isRole, setIsRole }}>
      {children}
    </UserRole.Provider>
  );
}