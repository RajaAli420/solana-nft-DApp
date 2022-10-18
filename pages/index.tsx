import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram, useClaimNFT } from "@thirdweb-dev/react/solana";
import { useState } from "react";
import swal from 'sweetalert';

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  // Here's how to get the thirdweb SDK instance
  // const sdk = useSDK();
  // Here's how to get a nft collection
  // const { program } = useProgram(
  //   your_nft_collection_address,
  //   "nft-collection"
  // );

  

  const wallet = useWallet().publicKey;
  const isConnected = !!wallet;
  
  const { program, isLoading } = useProgram(
    "xxxxxZv1Ncxxxxxxxxxxxxxxv9hvrttNQixxxxxx",
    "nft-drop"
  );


  const claim = useClaimNFT(program);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Image
            src="/3.png"
            height={240}
            width={200}
            objectFit="contain"
            alt="BR Labs"
          />
        </div>
        <h1 className={styles.h1}>Solana, meet Bankkroll 👋</h1>
        <p className={styles.explain}>
          Here is where will create your simple mint dapp to you liking.
        </p>
        

        {isConnected && (
          <div>
            <div>
            <button className="btn btn-5" onClick={() => claim.mutate({ amount: 1 },
              {
                onSuccess: (Success) => {
                  console.log(Success);
                  swal('Mint Successful','You minted 1 NFT!','success');
                },
                onError: (Error) => {
                  console.error(Error);
                  swal("Oops!", "Something went wrong!", "error");
                },
              })}>
            {claim.isLoading
              ? "Claiming....."
              : claim.isSuccess
              ? "Success Minting!"
              : "Mint NFT 0.8 SOL"}</button>
            </div>
          </div>
        )}
        
        
        <div className="sec"></div>

        <WalletMultiButton />

        <div className={styles.iconContainer}>
          <Image
            src="/sol.png"
            height={40}
            width={40}
            objectFit="contain"
            alt="SOLANA"
          />
        </div>
        

        <div> 
          <h5 className="footer">
            Developed with ❤️‍🔥 by: <a href="https://twitter.com/bankkroll_eth">
              Bankkroll</a>
              &nbsp;-&nbsp;<a href="https://bankkroll.xyz">
              BR Labs</a>
          </h5>
        </div>
      </div>
  
    </>
  );
};

export default Home;

