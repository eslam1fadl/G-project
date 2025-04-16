import { createContext, useState, useEffect } from "react";
export const DoctorId = createContext(null);
export default function DoctorIdProvider({ children }) {
  let [isDoctorId, setDoctorId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('id'))
      setDoctorId(localStorage.getItem('id'));
  }, []);
  return (
    <DoctorId.Provider value={{ isDoctorId, setDoctorId}}>
      {children}
    </DoctorId.Provider>
  );
}
