import { Dispatch, SetStateAction } from "react";
import { Card } from "./Card";
import { TezosToolkit } from "@taquito/taquito";
import { Button } from "./Button";
import { MainState } from "../types";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {NetworkType} from '@airgap/beacon-types'; 


export const Account = ({className, Tezos, state: {walletConnected, isLoading, pkh, balance}, setState, wallet }: {className?: string; Tezos: TezosToolkit; state: MainState; setState: Dispatch<SetStateAction<MainState>>; wallet: BeaconWallet}) => {
  console.log('here')

  const connectWallet = async () => {
    // TODO CONNECT WALLET
    console.log("connect wallet")
    await wallet.requestPermissions({network: { type: NetworkType.CUSTOM, rpcUrl: 'http://localhost:20000' }});
    Tezos.setWalletProvider(wallet);
    setState((prev: MainState) => ({...prev, walletConnected: true}));
  }

  const disconnectWallet = async () => {
    // TODO DISCONNECT WALLET
    console.log("disconnect wallet")
    await wallet.clearActiveAccount();
    Tezos.setWalletProvider(undefined);
    setState((prev: MainState) => ({...prev, walletConnected: false}));
  }

  return (
    <Card className={`w-fit mt-4 mr-4 p-4 h-fit ${className}`}>
      <div className="flex justify-center items-center flex-col">
        {walletConnected ? 
          <Button className="mb-2 border-2 p-2 rounded-md border-green-600" onClick={disconnectWallet}>Disconnect</Button> 
          : 
          <Button className="border-2 p-2 rounded-md border-green-600" onClick={connectWallet}>Connect Wallet</Button>}
      </div>
      {walletConnected ?
        <>
        {/* TODO DISPLAY ACCOUNT */}
          <p className="pb-2">PKH: {pkh}</p>
          <p>BALANCE: {balance}</p>
          {/* <p className="pb-2">PKH: tz1somethingsomething</p>
          <p>BALANCE: 1000000000</p> */}
        </>
        :
        <></>
      }
    </Card>
  )
}