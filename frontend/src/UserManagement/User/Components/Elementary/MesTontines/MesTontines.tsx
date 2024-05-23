import { Outlet } from "react-router-dom";

const MesTontines = () => {
 

  return (
    <div className="p-2 z-0">
      
      <div className=" w-full   h-full bottom-30 mb-[30px] mt-5 z-0">
        <Outlet />
      </div>
    </div>
  );
};

export default MesTontines;
