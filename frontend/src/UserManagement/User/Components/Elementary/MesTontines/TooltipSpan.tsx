import React from "react";
import "./TooltipSpan.css";
type TooltipSpanProps = {
  text: string;
  tooltip: string;
};

const TooltipSpan: React.FC<TooltipSpanProps> = ({ text, tooltip }) => {
  return (
    <div className="relative flex items-center group">
      <span>{text}</span>
      <div className="absolute w-[10vw] top-full left-1/2  -translate-x-1/2 mb-2 hidden group-hover:flex items-center text-white  font-semibold justify-center bg-[#828181]  text-sm rounded py-1 px-2">
        {tooltip}
        
      </div>
    </div>
  );
};

export default TooltipSpan;
