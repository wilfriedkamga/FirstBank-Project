import React from 'react';
import wordIcon from '../../../../Assets/Images/word.png'
import excelIcon from '../../../../Assets/Images/Excel.png'
import pdfIcon from '../../../../Assets/Images/pdf.jpg'
import imageIcon from '../../../../Assets/Images/image.png'
import fileIcon from '../../../../Assets/Images/fichier.png'
import powerpointIcon from '../../../../Assets/Images/powerpoint.png'
// Component for Document Icon
export const DocumentIcon: React.FC = () => (
  <img src={wordIcon} alt="Document Icon"className='w-10  h-10' />
);

// Component for Excel Icon
export const ExcelIcon: React.FC = () => (
  <img src={excelIcon} alt="Excel Icon" className='w-10  h-10' />
);

// Component for Image Icon
export const ImageIcon: React.FC = () => (
  <img src={imageIcon} alt="Image Icon"className='w-10  h-10' />
);

// Component for PDF Icon
export const PdfIcon: React.FC = () => (
  <img src={pdfIcon} alt="PDF Icon"className='w-10  h-10' />
);

// Component for PowerPoint Icon
export const PowerPointIcon: React.FC = () => (
  <img src={powerpointIcon} alt="PowerPoint Icon" className='w-10  h-10' />
);

// Component for Word Icon
export const WordIcon: React.FC = () => (
  <img src={wordIcon} alt="Word Icon"className='w-10  h-10' />
);

// Component for Zip Icon
export const ZipIcon: React.FC = () => (
  <img src={fileIcon} alt="Zip Icon" className='w-10  h-10'  />
);

// Component for Generic File Icon
export const GenericFileIcon: React.FC = () => (
  <img src={fileIcon} alt="Generic File Icon" className='w-10  h-10'  />
);
