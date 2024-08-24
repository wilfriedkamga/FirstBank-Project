import SearchIcon from "@mui/icons-material/Search";
import logo from "../../../Assets/Images/FBLogo.png";
import AccountMenu from "./AccountMenu";
import FullScreenDialog from "../../../Front_Association/Component/Elementary/Notifications/FullScreenDialog";
import NotificationPanel from "../../../Front_Association/Component/Elementary/Navbar/NotificationPanel";

const HeaderTontine = () => {
  return (
    <div className="flex fixed bg-red-600 border-gray-500 z-[1000]  border-b justify-between w-[80%] border-[2px p-3">
      <div className="h-10 right-1 top-1 relative ">
        <img src={logo} alt="logo" width={40} height={25} />
      </div>
      <div className="h-10 flex gap-2 space-x-1">
        <div className="h-full">
          <a
            className="flex font-bold text-white h-8 w-8 md:h-10 md:w-10 rounded-full"
            href="/search"
          >
            <SearchIcon
              sx={{
                fontSize: "40px",
                top: 2,
                right: "20px",
                position: "relative",
              }}
              className="h-8 font-extrabold w-8"
            />
          </a>
        </div>
        <div className="h-full">
          <FullScreenDialog />
        </div>
        <div className="h-full ">
          <NotificationPanel />
        </div>
        <div className="h-full ">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default HeaderTontine;
