import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";

const paymentModes = ["Présentiel", "Mobile"];
const mobilePaymentModes = ["Orange Money", "MTN Money"];
const validators = ["Validateur 1", "Validateur 2"];

interface Member {
  id: string;
  name: string;
  occurrences: number;
  amountToPay: number;
  amountPaid: number; // Nouvelle propriété pour le montant payé
  contributions: string[]; // ["green", "red", "orange", "gray"]
}

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Membre 1",
    occurrences: 1,
    amountToPay: 10000,
    amountPaid: 0,
    contributions: ["green", "red", "orange", "gray"],
  },
  {
    id: "2",
    name: "Membre 2",
    occurrences: 1,
    amountToPay: 10000,
    amountPaid: 0,
    contributions: ["green", "green", "green", "gray"],
  },
  {
    id: "3",
    name: "Membre 3",
    occurrences: 2,
    amountToPay: 20000,
    amountPaid: 0,
    contributions: ["red", "red", "gray", "gray"],
  },
  {
    id: "4",
    name: "Membre 4",
    occurrences: 3,
    amountToPay: 30000,
    amountPaid: 0,
    contributions: ["green", "green", "orange", "gray"],
  },
  {
    id: "5",
    name: "Membre 5",
    occurrences: 4,
    amountToPay: 40000,
    amountPaid: 0,
    contributions: ["gray", "gray", "orange", "orange"],
  },
  {
    id: "6",
    name: "Membre 6",
    occurrences: 7,
    amountToPay: 70000,
    amountPaid: 0,
    contributions: ["green", "red", "orange", "green"],
  },
  {
    id: "7",
    name: "Membre 7",
    occurrences: 1,
    amountToPay: 10000,
    amountPaid: 0,
    contributions: ["gray", "red", "orange", "green"],
  },
  {
    id: "8",
    name: "Membre 8",
    occurrences: 2,
    amountToPay: 20000,
    amountPaid: 0,
    contributions: ["green", "gray", "gray", "orange"],
  },
  {
    id: "9",
    name: "Membre 9",
    occurrences: 3,
    amountToPay: 30000,
    amountPaid: 0,
    contributions: ["red", "green", "orange", "gray"],
  },
  {
    id: "10",
    name: "Membre 10",
    occurrences: 6,
    amountToPay: 60000,
    amountPaid: 0,
    contributions: ["green", "red", "orange", "gray"],
  },
];

const Tontine: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [validateDialogOpen, setValidateDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0); // Pour gérer le montant du paiement

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePayClick = (member: Member) => {
    setSelectedMember(member);
    setPaymentDialogOpen(true);
  };

  const handleValidateClick = (member: Member) => {
    setSelectedMember(member);
    setValidateDialogOpen(true);
  };

  const handlePaymentDialogClose = () => {
    setPaymentDialogOpen(false);
    setSelectedMember(null);
  };

  const handleValidateDialogClose = () => {
    setValidateDialogOpen(false);
    setSelectedMember(null);
  };

  const handlePaymentConfirm = () => {
    if (selectedMember) {
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === selectedMember.id
            ? { ...member, amountPaid: member.amountPaid + paymentAmount }
            : member
        )
      );
    }
    setPaymentDialogOpen(false);
    setSelectedMember(null);
    setPaymentAmount(0); // Réinitialiser le montant du paiement
  };

  return (
    <Box className="bg-white h-full p-4">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Occurrences</TableCell>
              <TableCell>Montant à payer</TableCell>
              <TableCell>Montant payé</TableCell>
              <TableCell>Etat des cotisations</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.occurrences}</TableCell>
                  <TableCell>{member.amountToPay} FCFA</TableCell>
                  <TableCell>{member.amountPaid} FCFA</TableCell>
                  <TableCell>
                    {member.contributions.map((color, index) => (
                      <Box
                        key={index}
                        component="span"
                        sx={{
                          display: "inline-block",
                          width: 16,
                          height: 16,
                          backgroundColor: color,
                          marginRight: 1,
                          borderRadius: "50%",
                        }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Payer">
                      <IconButton onClick={() => handlePayClick(member)}>
                        <Button variant="contained" color="success">
                          Payer
                        </Button>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Valider">
                      <IconButton onClick={() => handleValidateClick(member)}>
                        <Button variant="contained" color="primary">
                          Valider
                        </Button>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modale pour payer une cotisation */}
      {selectedMember && (
        <Dialog open={paymentDialogOpen} onClose={handlePaymentDialogClose}>
          <DialogTitle>Payer une cotisation</DialogTitle>
          <DialogContent>
            <Select
              fullWidth
              label="Mode de paiement"
              defaultValue=""
              onChange={(e) => {
                // Handle payment mode selection
              }}
            >
              {paymentModes.map((mode) => (
                <MenuItem key={mode} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePaymentDialogClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handlePaymentConfirm} color="primary">
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Modale pour valider une cotisation */}
      {selectedMember && (
        <Dialog open={validateDialogOpen} onClose={handleValidateDialogClose}>
          <DialogTitle>Valider la cotisation</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              label="Montant"
              type="number"
              fullWidth
              // Gérer la valeur et le onChange
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleValidateDialogClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleValidateDialogClose} color="primary">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Tontine;
