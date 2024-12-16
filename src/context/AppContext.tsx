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

interface User {
  name: string;
}

interface Admin {
  adminName: string;
}
interface AppContextType {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  showSchoolDetails: boolean;
  setShowSchoolDetails: React.Dispatch<React.SetStateAction<boolean>>;
  schoolDetails: School;
  setSchoolDetails: React.Dispatch<React.SetStateAction<School>>;
  showUserDetails: boolean;
  setShowUserDetails: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: User;
  setUserDetails: React.Dispatch<React.SetStateAction<User>>;
  adminDetails: Admin;
  setAdminDetails: React.Dispatch<React.SetStateAction<Admin>>;
  showAdminDetails: boolean;
  setShowAdminDetails: React.Dispatch<React.SetStateAction<boolean>>;
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
  showMobileNav: boolean;
  setShowMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppContextProvider = ({ children }: any) => {
  const [showAdminDetails, setShowAdminDetails] = useState(false);
  const [adminDetails, setAdminDetails] = useState({} as Admin);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState({} as User);
  const [showSchoolDetails, setShowSchoolDetails] = useState(false);
  const [schoolDetails, setSchoolDetails] = useState({} as School);
  const [showNotification, setShowNotification] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

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
        setShowSchoolDetails,
        showUserDetails,
        setShowUserDetails,
        userDetails,
        setUserDetails,
        showAdminDetails,
        setShowAdminDetails,
        adminDetails,
        setAdminDetails,
        showMobileNav,
        setShowMobileNav
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
