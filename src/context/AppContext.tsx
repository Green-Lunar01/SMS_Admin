/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from 'react';

interface School {
  teachers: string;
  totalSubjects: string;
  Name: string;
  email: string;
  students: string;
  location: string;
  employee: string;
  status: string;
  SignUpDate: string;
  SignUpRole: string;
  phoneNumber: string;
  tagLine: string;
  address: string;
  website: string;
  src: string;
}
interface AppContextType {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  showSchoolDetails: boolean;
  setShowSchoolDetails: React.Dispatch<React.SetStateAction<boolean>>;
  schoolDetails: School;
  setSchoolDetails: React.Dispatch<React.SetStateAction<School>>;
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppContextProvider = ({ children }: any) => {
  const [showSchoolDetails, setShowSchoolDetails] = useState(false);
  const [schoolDetails, setSchoolDetails] = useState({} as School);
  const [showNotification, setShowNotification] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <AppContext.Provider
      value={{
        showNotification,
        setShowNotification,
        showChat,
        setShowChat,
        schoolDetails,
        setSchoolDetails,
        showSchoolDetails,
        setShowSchoolDetails
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
