import { InfoBlob } from "@/app/types";
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
  selectedContract: string;
  setSelectedContract: React.Dispatch<React.SetStateAction<string>>;
  selectedUserWallet: string;
  setSelectedUserWallet: React.Dispatch<React.SetStateAction<string>>;
  setMyInteger: React.Dispatch<React.SetStateAction<number>>;
  tokenSupply: string;
  setTokenSupply: React.Dispatch<React.SetStateAction<string>>;
  contextBlob: InfoBlob | undefined;
  setContextBlob: React.Dispatch<React.SetStateAction<InfoBlob | undefined>>;
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
  const [selectedContract, setSelectedContract] = useState<string>(''); // Initialize with your desired integer value
  const [selectedUserWallet, setSelectedUserWallet] = useState<string>(''); // Initialize with your desired integer value
  const [tokenSupply, setTokenSupply] = useState<string>(''); // Initialize with your desired integer value
  const [contextBlob, setContextBlob] = useState<InfoBlob>(); // Initialize with your desired integer value
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
    <MyContext.Provider value={{ myInteger, setMyInteger, chainId, selectedContract, selectedUserWallet, setSelectedContract, setSelectedUserWallet, tokenSupply, setTokenSupply, contextBlob, setContextBlob }}>
      {children}
    </MyContext.Provider>
  );
}
