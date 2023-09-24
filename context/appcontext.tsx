import { createContext, useState, useContext, ReactNode } from 'react';

type MyContextType = {
  myInteger: number;
  setMyInteger: React.Dispatch<React.SetStateAction<number>>;
  // creatorName: string;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}

type MyContextProviderProps = {
  children: ReactNode;
};

export function MyContextProvider({ children }: MyContextProviderProps) {
  const [myInteger, setMyInteger] = useState<number>(0); // Initialize with your desired integer value

  // You can add functions to update myInteger if needed

  return (
    <MyContext.Provider value={{ myInteger, setMyInteger }}>
      {children}
    </MyContext.Provider>
  );
}
