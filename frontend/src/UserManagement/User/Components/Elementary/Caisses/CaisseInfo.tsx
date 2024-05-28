import React from 'react';

interface TableRowProps {
  label: string;
  value: string;
}
const TableRow: React.FC<TableRowProps> = ({ label, value }) => (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
  
  const CaisseInfo: React.FC = () => {
    const rows = [
      { label: 'Nom de la caisse', value: 'Caisse 1' },
      { label: 'Type de la caisse', value: 'Type A' },
      { label: 'Créer par :', value: 'Jean Dupont' },
      { label: 'Date de creation', value: '2024-05-27' },
      { label: 'Montant des cotisations', value: '1000€' },
      { label: 'Montant Réel dans la caisse', value: '950€' },
      { label: 'Montant exact', value: '950€' },
    ];
  
    return (
      <table>
        <tbody>
          {rows.map((row, index) => (
            <TableRow key={index} label={row.label} value={row.value} />
          ))}
        </tbody>
      </table>
    );
  };
  
  export default CaisseInfo;