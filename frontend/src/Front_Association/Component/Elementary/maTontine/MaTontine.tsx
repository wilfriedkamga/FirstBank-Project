import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AssociationServices from "../../../../Services/AssociationServices";
import { ActionType, AssociationModel, EtatMembre, InvitationType, membreAssoModel } from "../../../../Services/Types";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardContent,
  CardHeader,
  Card,
  Divider,
  Grid,
  Paper,
  styled,
  Backdrop,
  CircularProgress,
  BackdropRoot,
} from "@mui/material";
import Variable from "../../../../Variable";
import { CreatorView } from "./View/CreatorMember";
import { OpenedAssociation } from "./View/OpenAssociation";
import { InviteMemberView } from "./View/InviteMember";


export const MaTontine = () => {
  const [association, setAssociation] = useState<AssociationModel>();
  const [data, setData] = useState<membreAssoModel[]>([]);
  const [isFunctional, setIsFunctional] = useState<boolean>(false);
  const [creatorPhone, setCreatorPhone] = useState<string>("");
  const [currentMember, setCurrentMember] = useState<membreAssoModel| undefined>();
  const [currentPhone, setCurrentPhone] = useState<string>("");
  const [message, setMessage]=useState("")
  const [open, setOpen]=useState<boolean>(false)
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    const myPhone = user.user.phone;
    setCurrentPhone(myPhone)
    
    AssociationServices.GetMembersByAssociationId(
      location.pathname.split("/")[3]
    ).then((response) => {
      console.log(response.data.data)
      setData(response.data.data);
      const data2: membreAssoModel[] = response.data.data;
    })
    .catch((error)=>{
      console.log(error)
    });

    AssociationServices.GetCurrentMember(
      myPhone,
      location.pathname.split("/")[3]
    )
      .then((response) => {
        console.log("Current member", response.data.data)
        setCurrentMember(response.data.data);
        
      })
      .catch((error) => {
        console.log(error);
      }); 

    AssociationServices.GetAssociationDetails(location.pathname.split("/")[3])
      .then((response) => {
        setAssociation(response.data.data);
        console.log("association",response);
        setCreatorPhone(response.data.data.phoneCreator)
        setIsFunctional(response.data.data.alreadyOpen);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
   
   const handleAddMember=(data:any)=>{
    AssociationServices.AddMemberInCreation(data)
        .then((response) => {
          const membre: membreAssoModel = response.data.data;
          setData((prevData) => [...prevData, membre])
        })
        .catch((error) => {
          console.log(error);
        });
   }
  const handleAnswer=(res:boolean)=>{
  
    const temp ={
        "responderId":currentMember?.id,
        "response":res,
        "associationId":location.pathname.split("/")[3],
        "type":"CREATE_ASSOCIATION",
        "roleId":""}
  
    AssociationServices.AnswerInvitation(temp)
    .then((response)=>{
           console.log(response)
           if(res){setData(data.map(memb=>memb.id===currentMember?.id?{...memb,state:EtatMembre.ACTIF}:memb))}
           else{setData(data.map(memb=>memb.id===currentMember?.id?{...memb,state:EtatMembre.REJETTE}:memb))}
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const messageList = {
    deleting: "Suppression de votre association.",
    opening: "Ouverture de votre association.",
    rejecting: "Vous n'allez plus accéder à cette page ci.",
    accepting: "Bienvenue dans notre association",
  };
  
    const handleRejectInvitation = () => {
      setMessage(messageList.deleting);
      setOpen(true);
      
      setTimeout(() => {
        handleAnswer(false)
        setOpen(false)
        navigate("/association/mes associations");
      }, 2000);
    };
   
    
  const handleDeleteAssociation = () => {
    setMessage(messageList.deleting);
    setOpen(true);
    setTimeout(() => {
      AssociationServices.delete_association(location.pathname.split("/")[3])
      .then((response) => {
        console.log(response);
        navigate("/association/mes associations");
      })
      .catch((error) => {
        console.log(error);
      });
      setOpen(false);
    }, 3000);
  };

    const handleAction =(memb:membreAssoModel, type:ActionType)=>{

      if(type==ActionType.DELETE){
       const upDateMember={...memb, state:EtatMembre.REJETTE}
       setData(data.map(dat=>dat.id==memb.id?upDateMember:dat))
       const temp={
        "associationId":location.pathname.split("/")[3],
        "responderId":memb.id,
        "roleId":"",
        "type":InvitationType.CREATE_ASSOCIATION
      }
      
  
      AssociationServices.CancelInvitation(temp)
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
               console.log(error)
      })
  
      }
      if(type==ActionType.CANCEL){
       const upDateMember={...memb, state:EtatMembre.REJETTE}
       setData(data.map(dat=>dat.id==memb.id?upDateMember:dat))
       const temp={
        "associationId":location.pathname.split("/")[3],
        "responderId":memb.id,
        "roleId":"",
        "type":InvitationType.CREATE_ASSOCIATION
      }
      
  
      AssociationServices.CancelInvitation(temp)
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
               console.log(error)
      })
  
      }
      if(type==ActionType.DELETE){
        
      }
   }

   const handleOpenAssociation = () => {
    setMessage(messageList.opening);
    setOpen(true);
    setTimeout(() => {
      AssociationServices.initialize_association(
        location.pathname.split("/")[3]
      )
        .then((response) => {
          setIsFunctional(true);
          setOpen(false);
        })
        .catch((error) => {
          setOpen(false);
          console.log("Nous n'avons pas pu ouvrir cette association");
        });
    }, 3000);
  };
  
    const handleAcceptInvitation = () => {
      setMessage(messageList.accepting);
      setOpen(true);
      
      setTimeout(() => {
        handleAnswer(true)
        setOpen(false)
      }, 2000);
    };

  return (
    <>
      {isFunctional?<OpenedAssociation association={association!} />:
      <>
      {creatorPhone==currentPhone?<CreatorView handleOpenAssociation={handleOpenAssociation} handleDeleteAssociation={handleDeleteAssociation} handleAction={handleAction} handleAddMember={handleAddMember} association={association} data={data}/>
      :
      <InviteMemberView association={association} currentMember={currentMember}  handleAnswer={handleAnswer}  data={data}/>}
      
      </>
      
     }
      
    </>
  );
};
