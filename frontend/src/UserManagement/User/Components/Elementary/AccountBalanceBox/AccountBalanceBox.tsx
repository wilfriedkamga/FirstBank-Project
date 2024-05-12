import React from "react";

const AccountBalanceBox = () => {
  return (
    <div className="bg-[#BB0A01] rounded-xl h-28 w-full flex justify-between md:h-32 shadow-lg">
      <div className="p-5">
        <h3 className="font-medium text-white font-account text-xl">
          Account Balance
        </h3>
        <p className="text-2xl text-white ml-5 font-account mt-2">
          738,650 FCFA
        </p>
      </div>
      <div className="mr-2">
        <img
          src="./assets/images/Work-life balance.svg"
          alt="accountBalance"
          width={130}
          height={130}
        />
      </div>
    </div>
  );
};

export default AccountBalanceBox;
