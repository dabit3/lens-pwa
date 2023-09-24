import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type MyContextType = {
  myInteger: number;
  chainId: number;
  setMyInteger: React.Dispatch<React.SetStateAction<number>>;
  // creatorName: string;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
}

type MyContextProviderProps = {
  children: ReactNode;
};

export function MyContextProvider({ children }: MyContextProviderProps) {
  const [myInteger, setMyInteger] = useState<number>(0); // Initialize with your desired integer value
  const [chainId, setChainId] = useState<number>(0); // Initialize with your desired integer value

  useEffect(() => {
    fetch("/api/chain").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setChainId(data.chainId);
          console.log("chainId: ", chainId);
        });
      } else {
        console.error("Failed to fetch data from the API");
      }
    });
  });

  return (
    <MyContext.Provider value={{ myInteger, setMyInteger, chainId }}>
      {children}
    </MyContext.Provider>
  );
}
