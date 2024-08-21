import React from 'react';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface TextFieldDateProps {
  value: Date | null | undefined;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
}

const TextFieldDate: React.FC<TextFieldDateProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  helperText,
  disabled,
  error,
  required = false,
}) => {

  const handleChange = (e: { value: Date | null }) => {
    onChange(e.value);
  };

  return (
    <div style={{ margin: '0', position: 'relative' }}>
      <Calendar
        value={value}
        onChange={()=>handleChange}  // Corrigé pour appeler correctement la fonction
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        required={required}
        placeholder="Select a date"
        showIcon
        className={`w-full ${error ? 'p-invalid' : ''}`}
        style={{
          width: '100%',
          padding: '0.75rem 1.25rem',  // Correspond à px-5 (1.25rem) et py-3 (0.75rem)
          height: '50px',  // Ajusté pour correspondre à la hauteur des autres champs
          marginBottom: '0.5rem',  // Correspond à mb-2
          color: '#4a5568',  // Correspond à text-gray-700
          backgroundColor: '#ffffff',  // Correspond à bg-white
          border: `1px solid ${error ? '#ef4444' : '#e2e8f0'}`,  // Correspond à border-gray-200 ou border-red-400
          borderRadius: '10px',  // Correspond à rounded-lg
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />
      {helperText && (
        <small style={{ 
          color: error ? '#ef4444' : 'gray', 
          display: 'block', 
          marginTop: '5px', 
          fontSize: '10px'  // Ajusté pour correspondre à la taille du texte d'aide des autres champs
        }}>
          {helperText}
        </small>
      )}
    </div>
  );
};

export default TextFieldDate;
