import React, { CSSProperties, useEffect, useState } from "react";
import SideBar from "../../Components/Elementary/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Elementary/Footer/Footer";
import logo from "../../Assets/Images/FBLogo.png";
import PropagateLoader from "react-spinners/PropagateLoader";
import Navbar from "../../Components/Elementary/Navbar/Navbar";
import Header from "../../../../SavingManagement/components/header/Header";
import HeaderTontine from "../../../../SavingManagement/components/header/HeaderTontine";

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
    }, 1000);
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
        <div className=" w-full h-screen flex  md:flex-row z-100 relative">
          <div className="w-1/5  h-screen bg-white sticky z-100 top-0 hidden md:block">
            <SideBar />
          </div>

          <div className="flex-1 block md:hidden  overflow-y-auto">
            <Header />

            <div className="bg-gray-100 min-h-[100%] h-auto mt-[5vh] mb-[5vh] sm:bg-[#828181] p-3 ">
              <Outlet />
            </div>
          </div>

          <div className="flex-1 hidden md:block  overflow-y-auto">
          <HeaderTontine />

            <div className="bg-white min-h-[100%] h-auto mt-[5vh]  sm:bg-[#828181] p-3 ">
              <Outlet />
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
