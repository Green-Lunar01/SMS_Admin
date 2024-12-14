/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from 'react';

interface AppContextType {
  showNotification: boolean;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppContextProvider = ({ children }: any) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <AppContext.Provider value={{ showNotification, setShowNotification, showChat, setShowChat }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
