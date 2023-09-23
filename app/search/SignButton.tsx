import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ethers } from "ethers";
// Import the contract ABI and contract address
// import MyNFTContract from './MyNFTContract.json'; // Replace with your contract's JSON file

export function SignMessageButton() {
  const { user, signMessage } = usePrivy();
  const {wallets} = useWallets();
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

//   const sampleChain = "0x$eip155:1";
// const sampleChain = "0x1";
const sampleChain = "0x1337";

  const thing = async () => {
    await embeddedWallet?.switchChain(sampleChain); // make sure the wallet is on the correct chain
    const provider = await embeddedWallet?.getEthersProvider(); // ethers provider object
    console.log(provider);
    const signer = provider?.getSigner(); // ethers signer object
    console.log(signer);
    const bal = await signer?.getBalance();
    console.log(bal);
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
    <button onClick={thing}>
        Bal
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