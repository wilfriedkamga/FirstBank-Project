import React, { CSSProperties, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import logo from "../../../Assets/Images/FBLogo.png";
import PropagateLoader from "react-spinners/PropagateLoader";
import SideBar from "../../../Components/AssociationUI/Elementary/SideBar/SideBar";
import Header from "../../../Components/SavingPlan/header/Header";
import HeaderTontine from "../../../Components/SavingPlan/header/HeaderTontine";
import Footer from "../../../Components/AssociationUI/Elementary/Footer/Footer";
import NavigationBar from "../../../Components/AssociationUI/Elementary/SideBar/NavigationBar";

export default function TontineHomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",

    fontWeight: "bold",
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="h-[100vh] w-full bg-[#828181] flex flex-col  justify-center items-center tet-white font-bold text-lg">
          <span className="text-[30px] font-bold text-red-800 mb-4 ">
            Bienvenu dans la gestion des tontines
          </span>
          <img src={logo} alt="" className="bg-white rounded-lg mb-5" />
          <PropagateLoader
            color={"white"}
            loading={isLoading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="">
          <div className=" w-full  h-screen flex  md:flex-row z-100 relative">
            <Header />

            <div className="w-[15%]  h-screen bg-white sticky z-100 top-0 hidden md:block">
              <SideBar />
            </div>
            <div className="flex-1  overflow-y-auto">
              <>
                <NavigationBar />
                <div className="bg-gray-200 mt-[1vh] min-h-[100%] h-auto  ">
                  <Outlet />
                </div>
              </>
            </div>
          </div>

          <div className="mt-10 w-full block sm:hidden absolute bottom-0  h-[60px]">
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}
