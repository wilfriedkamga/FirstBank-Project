import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ParticipantAsso from '../../../Front_Usermanagement/Page/Dashboard/Icons/ParticipantAsso';
import MoneyBag from '../../../Front_Usermanagement/Page/Dashboard/Icons/MoneyBag';
import Debt from '../../../Front_Usermanagement/Page/Dashboard/Icons/Debt';
import { AssociationModel } from '../../../Services/Types/AssociationModels';

interface AssociationProps {
    name: string;
    participants: number;
    funds: number;
    debt: number;
    meetingDate: string;
}

const AssociationCard2: React.FC<AssociationModel> = (association) => {
  return (
    <div className="bg-white text-sm rounded-md p-4 shadow-lg border mx-5 font-title">
      <h2 className="text-sm font-bold mb-4">{association.name}</h2>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center mb-2">
           <ParticipantAsso />
            <span className="ml-2 ">{association.nbMembre} participants</span>
          </div>
          <div className="flex items-center mb-2">
            <MoneyBag />
            <span className="ml-2">{association.nbTontine} funds</span>
          </div>
          <div className="flex items-center">
            <Debt />
            <span className="ml-2">{association.nbReunion} FCFA of Debt</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#0C1013] font-bold text-sm">
            Next meeting on
          </span>
          <div className="flex w-full justify-center items-center">
            <FontAwesomeIcon icon={faCaretDown} color='#BB0A01' size='lg'/>
          </div>
          <span className="text-red-500 mb-8 text-xs font-bold text-center w-full">
            {association.creationDate}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AssociationCard2
