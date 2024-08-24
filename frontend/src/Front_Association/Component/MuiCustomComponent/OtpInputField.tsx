import React from "react";
import { InputOtp } from "primereact/inputotp";
import "./OtpInputField.css"; // Importation du fichier CSS

interface OtpInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  required?: boolean;
}

const OtpInputField: React.FC<OtpInputFieldProps> = ({
  value,
  onChange,
  helperText,
  disabled,
  readOnly,
  error,
  placeholder = "",
  required = false,
}) => {

    const handleChange = (e:any) => {
        if (value !== null && value !== undefined) {
            onChange(e.value +"")
          
        } else {
          onChange('rasde'); // Ou gérez selon le besoin
        }
      };
      
  

  return (
    <div className="w-full flex flex-col items-center">
      <InputOtp
        value={value}
        onChange={handleChange} // Correction ici
        disabled={disabled || readOnly}
        required={required}
        length={5} // 5 chiffres pour l'OTP
        placeholder={placeholder}
        className={`p-inputotp ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {helperText && (
        <small
          className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </small>
      )}
    </div>
  );
};

export default OtpInputField;
