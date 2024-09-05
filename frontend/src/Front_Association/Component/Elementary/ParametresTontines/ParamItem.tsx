import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ListItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface ParamItemProps {
    tab: {
        label: string,
        link: string,
        Icon: any
    }}


const ParamItem = ({tab}:ParamItemProps) => {
  return (
    <div>
      <Link
            to={tab.link}
            className="flex flex-row group  items-center justify-start rounded-lg w-full hover:bg-white"
          >
            <div className="p-5 group-hover:text-[#BB0A01]">
              {tab.Icon}
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">
              {tab.label}
            </p>
          </Link>
    </div>
  );
};

export default ParamItem;
