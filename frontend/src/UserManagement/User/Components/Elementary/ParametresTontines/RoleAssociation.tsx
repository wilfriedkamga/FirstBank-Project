import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewRoleDialog from "./ViewRoleDialog";
import AddPrivilegeDialog from "./AddPrivilegeDialog";
import DeletePrivilegeDialog from "./DeletePrivillegeDialog";
import AddRoleDialog from "./AddRole";


const RoleAssociation = () => {
  function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const options = [
    "None",
    "Atria",
    "Callisto",
    "Dione",
    "Ganymede",
    "Hangouts Call",
    "Luna",
    "Oberon",
    "Phobos",
    "Pyxis",
    "Sedna",
    "Titania",
    "Triton",
    "Umbriel",
    "Phobos",
    "Pyxis",
    "Sedna",
    "Titania",
    "Triton",
    "Umbriel",
  ];
  return (
    <div className="w-full flex flex-col ">
      <Accordion sx={{ position: "fixed", width: "70%", right: "5vw" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Président</Typography>
        </AccordionSummary>
        <div>
          <AccordionDetails className="height-10vh">
            <Typography>
              <div className="flex border-t mb-4 justify-between">
                <p className="mt-2"> Les privilèges du rôle président</p>
               
              </div>

              <Box
                sx={{
                  flexGrow: 1,
                  maxHeight: "50vh",
                  padding: 2,
                  overflowY: "auto",
                  
                  
                  
                }}
              >
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  className="overflow"
                >
                  
                  {Array.from(Array(19)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <Item className="flex justify-between">
                        role.privillege
                        <div aria-label="delete" className="z-0">
                          <button className="hover:bg-gray-300 rounded-lg p-1"><ViewRoleDialog options={options}/></button>
                          <button className="hover:bg-gray-300 rounded-lg p-1"><DeletePrivilegeDialog/></button>
                        </div>
                      </Item>
                    </Grid>
                  ))}
                   
                </Grid>
                
              </Box>
            </Typography>
            <AddPrivilegeDialog options={options}/>
          </AccordionDetails>
        </div>
      </Accordion>
      <AddRoleDialog/>
      
    </div>
  );
};

export default RoleAssociation;
