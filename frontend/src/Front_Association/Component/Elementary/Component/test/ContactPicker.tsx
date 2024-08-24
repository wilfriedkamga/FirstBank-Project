import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { Person } from "@mui/icons-material";
import ContactModal from "./ContactModal";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const PhoneInputRole: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setPhoneNumber(contact.phone);
    handleCloseModal();
  };

  return (
    <div>
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleOpenModal}>
              <Person />
            </IconButton>
          ),
        }}
        fullWidth
      />
      <ContactModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSelectContact={handleContactSelect}
      />
    </div>
  );
};

export default PhoneInputRole;
