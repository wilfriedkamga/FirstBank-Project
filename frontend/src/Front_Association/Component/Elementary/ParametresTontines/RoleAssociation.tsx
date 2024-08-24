import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewRoleDialog from "./ViewRoleDialog";
import AddPrivilegeDialog from "./AddPrivilegeDialog";
import DeletePrivilegeDialog from "./DeletePrivillegeDialog";
import AddRoleDialog from "./AddRole";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type RoleWithPrivileges = {
  role: string;
  privileges: string[];
};

type RoleAccordionProps = {
  role: string;
  privileges: string[];
};

const RoleAccordion: React.FC<RoleAccordionProps> = ({ role, privileges }) => {
  const options = [
    "None",
    "Atria",
    "Callisto",
    "Dione",
    "Ganymede",
    "Hangouts Call",
    "Luna",
    "Oberon",
    "Phobos"
  ];

  return (
    <Accordion sx={{ marginBottom: 2, width: "100%" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${role}-content`}
        id={`${role}-header`}
      >
        <Typography>{role}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className="flex border-t mb-4 justify-between">
            <p className="mt-2">Les privilèges du rôle {role}</p>
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
            >
              {privileges.map((privilege, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Item className="flex justify-between">
                    {privilege}
                    <div aria-label="delete" className="z-0">
                      <button className="hover:bg-gray-300 rounded-lg p-1">
                        <ViewRoleDialog options={options} />
                      </button>
                      <button className="hover:bg-gray-300 rounded-lg p-1">
                        <DeletePrivilegeDialog />
                      </button>
                    </div>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Typography>
        <AddPrivilegeDialog options={options} />
      </AccordionDetails>
    </Accordion>
  );
};

type RoleAssociationProps = {
  rolesWithPrivileges: RoleWithPrivileges[];
};

const RoleAssociation: React.FC<RoleAssociationProps> = ({ rolesWithPrivileges }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {rolesWithPrivileges.map(({ role, privileges }, index) => (
        <RoleAccordion key={index} role={role} privileges={privileges} />
      ))}
      <AddRoleDialog />
    </div>
  );
};

export default RoleAssociation