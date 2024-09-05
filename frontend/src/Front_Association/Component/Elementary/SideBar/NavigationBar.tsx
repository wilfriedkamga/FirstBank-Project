// src/Components/NavigationBar.tsx

import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { ArrowBack, ArrowRight, Home } from "@mui/icons-material";

// Mapping des chemins vers des noms plus lisibles
const breadcrumbNameMap: { [key: string]: string } = {
  "/inbox": "Inbox",
  "/inbox/important": "Important",
  "/trash": "Corbeille",
  "/spam": "Spam",
  "/drafts": "Brouillons",
};

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour construire le tableau de navigation à partir de l'URL
  const buildNavigationItems = (pathname: string) => {
    const segments = pathname.split("/").filter((segment) => segment);

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      // Utilisation de decodeURIComponent pour décoder les segments d'URL
      const label = breadcrumbNameMap[path] || decodeURIComponent(segment);
      const labelv = label.length > 30 ? label.substring(0, 30) + "..." : label;
      return { label, labelv, lien: path };
    });
  };

  const formatLabel = (label: string): string => {
    return label
      .split(" ") // Sépare la chaîne par les espaces pour traiter chaque mot individuellement
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Met en majuscule la première lettre et en minuscule le reste
      .join(" "); // Rejoint les mots formattés en une seule chaîne
  };

  // Utilisation de useMemo pour éviter les recalculs inutiles
  const navigationItems = useMemo(
    () => buildNavigationItems(location.pathname),
    [location.pathname]
  );

  const handleNavigation = (lien: string) => {
    navigate(lien);
  };

  const handleBack = () => {
    if (navigationItems.length > 1) {
      navigate(navigationItems[navigationItems.length - 2].lien);
    }
  };

  return (
    <div className="sm:w-[85vw] w-full mt-[10vh]   flex items-center text-red-600 font-semibold  z-1000 h-[7vh]">
      <div className="hidden sm:flex">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className={"cursor-pointer " + (index == 0 && "ml-8")}
            onClick={() => handleNavigation(item.lien)}
          >
            {index == navigationItems.length-1 ? (
              <span className="bg-white font-extrabold text-xs   rounded-lg p-3">
                {index == 0 && <Home sx={{ marginBottom: "4px" }} />}{" "}
                {formatLabel(item.label)}
              </span>
            ) : (
              <span className="bg-white  text-xs font-semibold hover:font-extrabold hover:bg-gray-200 rounded-lg p-3">
                {index == 0 && <Home sx={{ marginBottom: "4px" }} />}{" "}
                {formatLabel(item.label)}
              </span>
            )}
            {index < navigationItems.length - 1 && (
              <ArrowRight sx={{ marginLeft: "2px" }} />
            )}
          </div>
        ))}
      </div>
      <div className="flex bg-gray-100 border-gray-400 border-t  z-[1000] items-center w-full fixed sm:hidden">
        <button
          onClick={handleBack}
          className=" px-3 py text-sm rounded text-red-600 mr-2"
          disabled={navigationItems.length <= 1}
        >
          <ArrowLeftIcon sx={{ fontSize: "50px" }} />
        </button>
        <div className="font-extrabold">
          {navigationItems[navigationItems.length - 1]?.labelv}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
