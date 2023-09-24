import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ethers } from "ethers";
import { useState } from 'react';
import {ShareSample__factory} from '../../typechain/factories/ShareSample__factory';
import { useMyContext } from "@/context/appcontext";
// Import the contract ABI and contract address
// import MyNFTContract from './MyNFTContract.json'; // Replace with your contract's JSON file

export function SignMessageButton() {
  const [walletBallance, setWalletBalance] = useState('');
  const { user, signMessage } = usePrivy();
  const {wallets} = useWallets();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  const {chainId} = useMyContext();
  embeddedWallet?.switchChain(chainId);


  const thing = async () => {
    await embeddedWallet?.switchChain(chainId); // make sure the wallet is on the correct chain
    const provider = await embeddedWallet?.getEthersProvider(); // ethers provider object
    const signer = provider?.getSigner(); // ethers signer object

    if (signer) {
      const address = await signer.getAddress(); // Get the wallet address
      const balance = await provider?.getBalance(address); // Get the balance
      console.log(`Wallet Address: ${address}`);
      console.log(`Balance: ${balance ? ethers.utils.formatEther(balance) : 'NONE'} ETH`);
      setWalletBalance(`${balance ? ethers.utils.formatEther(balance) : 'NONE'} ETH`)
    }

  }


//   const mintNFT = async () => {
//     await embeddedWallet?.switchChain(sampleChain); // make sure the wallet is on the correct chain
//     const provider = await embeddedWallet?.getEthersProvider();
//     const signer = provider?.getSigner();

//     // Replace 'MyNFTContractAddress' with your contract's address
//     const contractAddress = 'MyNFTContractAddress';
    
//     // Load the contract with the ABI and address
//     const contract = new ethers.Contract(contractAddress, MyNFTContract.abi, signer);

//     // Call the mint function on your contract
//     try {
//       const transaction = await contract.mintNFT(); // Replace with your contract's mint function
//       await transaction.wait();
//       console.log('NFT minted successfully');
//     } catch (error) {
//       console.error('Error minting NFT:', error);
//     }
//   }


  // Replace this with the message you'd like your user to sign
  const message = 'Hello world';
  // Replace this with the text you'd like on your signature modal,
  // if you do not have `noPromptsOnSignature` enabled
  const uiConfig = {
    title: 'Sample title text',
    description: 'Sample description text',
    buttonText: 'Sample button text'
  };

  // Users must have an embedded wallet at `user.wallet` to sign a message.
  return (
    <>
    <p>Wallet: {embeddedWallet?.address}</p>
    <br />
    <button onClick={thing}>
        Bal : {walletBallance}
    </button>
    <br />
    <button disabled={!user?.wallet} onClick={async () => {
        const signature = await signMessage(message, uiConfig);
        // Use `signature` however you'd like
    }}>
        Sign
    </button>
    </>
);
}