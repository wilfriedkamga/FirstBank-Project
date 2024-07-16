import React from "react";
import StickyHeadTable from "./ReactVirtualizedTable";

const MesCotisation = () => {
  return (
    <div>
      <div className="md:block hidden">
        <StickyHeadTable />
      </div>
      <div className="md:hidden block"></div>
    </div>
  );
};

export default MesCotisation;
