import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
import { formatDate } from "../Utils";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";
import { AssociationModel } from "../../../../Services/Types/AssociationModels";


const add = (baseUrl: string, id: string) => {
  return baseUrl + id;
};

type props={
  association:AssociationModel
}

const AssociationCardM = ({ association }: props) => {

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{fontWeight:"bold",lineClamp:1}}>
          {association.name}
        </Typography>

        <Divider />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <PeopleOutlineIcon /> Membres : {association.nbMembre}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <SavingsOutlinedIcon /> Tontines : {association.nbTontine}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <NotificationsNoneIcon /> Notifications: {association.creationDate}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-center  items-center">
        <Button className="bg-red-600" size="large">
          {" "}
          <Link
            className="text-white bg-red-600 px-6 rounded-lg  "
            to={"/association/mes associations/" + association.id}
          >
            {" "}
            Visiter
          </Link>
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <>
      <Card sx={{border:"1px solid gray"}} variant="outlined">{card}</Card>
    </>
  );
};
  
export default AssociationCardM;
