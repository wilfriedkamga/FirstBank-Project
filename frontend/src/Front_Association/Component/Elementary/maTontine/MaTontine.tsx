import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AssociationServices from "../../../../Services/AssociationServices";
import { AssociationModel, membreAssoModel } from "../../../../Services/Types";
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
  const [currentMember, setCurrentMember] = useState<membreAssoModel>();
  const [currentPhone, setCurrentPhone] = useState<string>("");
  

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

    AssociationServices.GetAssociationDetails(location.pathname.split("/")[3])
      .then((response) => {
        setAssociation(response.data.data);
        console.log(response);
        setCreatorPhone(response.data.data.phoneCreator)
        setIsFunctional(response.data.data.alreadyOpen);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {isFunctional?<OpenedAssociation association={association!} />:
      <>
      {creatorPhone==currentPhone?<CreatorView association={association} data={data}/>:<InviteMemberView data={data}/>}
      
      </>
      
     }
      
    </>
  );
};
