// src/Components/NavigationBar.tsx

import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction pour construire le tableau de navigation à partir de l'URL
  const buildNavigationItems = (pathname: string) => {
    const segments = pathname.split('/').filter(segment => segment);

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return { label: segment, lien: path };
    });
  };

  // Utilisation de useMemo pour éviter les recalculs inutiles
  const navigationItems = useMemo(() => buildNavigationItems(location.pathname), [location.pathname]);

  const handleNavigation = (lien: string) => {
    navigate(lien);
  };

  const handleBack = () => {
    if (navigationItems.length > 1) {
      navigate(navigationItems[navigationItems.length - 2].lien);
    }
  };

  return (
    <div className="sm:w-[85vw] w-full mt-[10vh]  flex items-center text-red-600 font-extrabold px-4 z-1000 bg-gray-400 h-[7vh]">
      <div className="hidden sm:flex">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className="mx-2 cursor-pointer "
            onClick={() => handleNavigation(item.lien)}
          ><span className="bg-white hover:bg-gray-200 rounded-lg p-2">{item.label}</span>
            
            {index < navigationItems.length - 1 && " > "}
          </div>
        ))}
      </div>
      <div className="flex  sm:hidden ">
        <button
          onClick={handleBack}
          className="bg-gray-700  px-2 py-1 rounded text-white mr-2"
          disabled={navigationItems.length <= 1}
        >
          Retour
        </button>
        <div className="font-extrabold">
          {navigationItems[navigationItems.length - 1]?.label}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

