import React from 'react'
import Footer from '../Footer/Footer'
import RoleAssociation from './RoleAssociation'

type RoleWithPrivileges = {
    role: string;
    privileges: string[];
  };
  

const ParamRoles = () => {
    const rolesWithPrivileges: RoleWithPrivileges[] = [
        { role: "Président", privileges: ["role.privilege1", "role.privilege2", "role.privilege3"] },
        { role: "Vice-Président", privileges: ["role.privilege1", "role.privilege2"] },
        // Add more roles and privileges as needed
      ];
  return (
    <div className="w-full bg-gray-300 pt-6 h-full min-h-[100vh] flex flex-col">
      <div className="flex flex-col md:px-5 h-full w-full space-y-8 overflow-auto">
        <div className="flex flex-col bg-gray-300 w-full p-2 space-y-2">
          Gerer les roles ici
          
          <RoleAssociation rolesWithPrivileges={rolesWithPrivileges} />
        </div>
      </div>
      <div className="w-full h-fit z-20">
        <Footer />
      </div>
    </div>
  )
}

export default ParamRoles

