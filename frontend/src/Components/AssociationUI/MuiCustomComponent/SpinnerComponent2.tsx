import React from 'react';

type SpinnerComponentProps = {
  size?: number;       // Taille du spinner
  color?: string;      // Couleur du spinner
  speed?: number;      // Vitesse de l'animation (en secondes)
};

const SpinnerComponent: React.FC<SpinnerComponentProps> = ({
  size = 120,
  color = '#f9f9f9',
  speed = 1,
}) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const animationStyle = {
    animationDuration: `${speed}s`,
    borderTopColor: 'transparent',
    borderColor: `${color} transparent ${color} ${color}`,
  };

  return (
    <div
      className="loadingio-spinner-rolling"
      style={spinnerStyle}
    >
      <div className="ldio">
        <div style={animationStyle}></div>
      </div>

      <style type="text/css">
        {`
          @keyframes ldio {
            0% { transform: translate(-50%,-50%) rotate(0deg); }
            100% { transform: translate(-50%,-50%) rotate(360deg); }
          }
          .ldio div {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 20px solid ${color};
            border-top-color: ${animationStyle.borderTopColor};
            border-radius: 50%;
            animation: ldio ${speed}s linear infinite;
          }
          .loadingio-spinner-rolling {
            width: ${size}px;
            height: ${size}px;
            display: inline-block;
            overflow: hidden;
            background: transparent;
          }
          .ldio {
            width: 100%;
            height: 100%;
            position: relative;
            transform: translateZ(0) scale(1);
            backface-visibility: hidden;
            transform-origin: 0 0;
          }
          .ldio div {
            box-sizing: content-box;
          }
        `}
      </style>
    </div>
  );
};

export default SpinnerComponent;
