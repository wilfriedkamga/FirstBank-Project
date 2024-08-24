import React, { useEffect, useState } from "react";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import { useNavigate } from "react-router-dom";
import Variable from "../../../../Variable";
import AssociationServices from "../../../../Services/AssociationServices";

function Dashboard() {
  const [stats, setStats] = useState([
    {
      _id: "1",
      label: "Mes associations",
      total: "0",
      icon: <SpaceDashboardSharpIcon />,
      link: "/association/mes associations",
    },
    {
      _id: "2",
      label: "Mes tontines",
      total: "0",
      icon: <SpaceDashboardSharpIcon />,
      link: "/association/tontines",
    },
    {
      _id: "3",
      label: "Mes cotisations",
      total: "0",
      icon: <SpaceDashboardSharpIcon />,
      link: "/association/mes cotisations",
    },
    {
      _id: "4",
      label: "Mes dettes",
      total: "0",
      icon: <SpaceDashboardSharpIcon />,
      link: "/association/mes dettes",
    },
    {
      _id: "5",
      label: "Mes sanctions",
      total: "0",
      icon: <SpaceDashboardSharpIcon />,
      link: "/association/mes sanctions",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    const phone = user.user.phone;

    AssociationServices.GetMemberDetails(phone)
      .then((response) => {
        const data = response.data;
        const updatedStats = [
          { ...stats[0], total: data.nbAssociations },
          { ...stats[1], total: data.nbTontines },
          { ...stats[2], total: data.nbCotisations },
          { ...stats[3], total: data.nbDettes },
          { ...stats[4], total: data.nbSanctions },
          // Ajoutez cette ligne si vous avez l'information sur les cagnottes
        ];
        setStats(updatedStats);
      })
      .catch((error) => {});
  }, []);

  const Card = ({ label, count, link, icon }: any) => {
    return (
      <div
        onClick={() => navigate(link)}
        className="w-full sm:h-32 shadow bg-white p-5 border border-gray-400 rounded-md flex items-center justify-between"
      >
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-black font-bold">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
        </div>

        <div className="w-10 h-10 rounded-full flex items-center bg-red-700 justify-center text-white">
          {icon}
        </div>
      </div>
    );
  };

  const Style =
    "w-10 h-10 rounded-full flex items-center justify-center text-white";

  return (
    <div>
      <div className="h-full py-4 mb-9">
        <div className="grid p-4 grid-cols-1 md:grid-cols-4 sm:gap-5 gap-2">
          {stats.map(({ icon, link, label, total }, index) => (
            <Card
              key={index}
              icon={icon}
              link={link}
              label={label}
              count={total}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
