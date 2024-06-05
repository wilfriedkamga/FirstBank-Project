import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { request } from '../../operation_service';

interface Wallet {
  balance: number;
  currency: string
}

const AccountBalanceBox = () => {

  const [wallet, setWallet] = useState<Wallet>({'balance': 0, 'currency': 'GBF'})
  const owner = "+237695964361";

  useEffect(() => {
    const data = async () => {
      try {
        const response = await request("GET", "/api/operationService/get-account-balance", {
          owner: owner,
        })
        if (!response.data){
          setWallet(response.data)
        }
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }

    data()
  })

  return (
    <div className='bg-[#BB0A01] rounded-xl h-32 w-full flex justify-between md:h-52 shadow-lg'>
      <div className="p-5">
        <h3 className="font-medium text-white font-account text-xl">Account Balance</h3>
        <p className="text-2xl text-white ml-5 font-title mt-2 md:pt-12 md:text-3xl">
          {wallet.balance}  {wallet.currency}
        </p>
      </div>
      <div className='mr-2'>
        <img src='./assets/images/wallet.svg' alt='accountBalance' width={100} height={100} className='pt-5 md:h-full' />
      </div>
    </div>
  )
}

export default AccountBalanceBox
