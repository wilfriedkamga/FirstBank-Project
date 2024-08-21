// src/types/react-perfect-scrollbar.d.ts

declare module 'react-perfect-scrollbar' {
    import * as React from 'react';
  
    interface PerfectScrollbarProps extends React.HTMLProps<HTMLDivElement> {
      options?: object;
    }
  
    const PerfectScrollbar: React.FC<PerfectScrollbarProps>;
  
    export default PerfectScrollbar;
  }
  