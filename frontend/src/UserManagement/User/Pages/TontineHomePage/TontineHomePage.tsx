import React, { CSSProperties, useEffect, useState } from "react";
import SideBar from "../../Components/Elementary/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Elementary/Navbar/Navbar";
import Footer from "../../Components/Elementary/Footer/Footer";
import MobileSideBar from "../../Components/Elementary/SideBar/MobileSideBar";
import logo from "../../Assets/Images/FBLogo.png"
import PropagateLoader from 'react-spinners/PropagateLoader';

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
    }, 5000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="h-[100vh] w-full bg-[#828181] flex flex-col  justify-center items-center tet-white font-bold text-lg">
          <span className="text-[30px] font-bold text-red-800 mb-4 ">Bienvenu dans la gestion des tontines</span>
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
          <div className="w-1/5 h-screen bg-white sticky z-100 top-0 hidden md:block">
            <SideBar />
          </div>

          <div className="flex-1 overflow-y-auto">
            <Navbar />

            <div className="bg-white h-full mb-[40px] sm:bg-[#828181] p-3 ">
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
