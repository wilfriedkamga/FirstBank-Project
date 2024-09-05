import { Outlet } from "react-router-dom";

const MesTontines = () => {
 

  return (
    <div className="p z-0">
      
      <div className=" w-full h-full bottom-30 mb-[30px] z-0">
        <Outlet />
      </div>
    </div>
  );
};

export default MesTontines;
