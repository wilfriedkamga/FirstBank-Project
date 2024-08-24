import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  onSelectContact: (contact: Contact) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose, onSelectContact }) => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phone: '987-654-3210' },
    { id: 3, name: 'Bob Johnson', phone: '555-555-5555' },
  ]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    onSelectContact(contact);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Select a Contact
        </Typography>
        <List>
          {contacts.map((contact) => (
            <ListItem
              key={contact.id}
              button
              onClick={() => handleContactSelect(contact)}
              selected={selectedContact?.id === contact.id}
            >
              <ListItemText primary={contact.name} secondary={contact.phone} />
            </ListItem>
          ))}
        </List>
        {selectedContact && (
          <TextField
            label="Selected Contact"
            value={`${selectedContact.name} (${selectedContact.phone})`}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        )}
      </Box>
    </Modal>
  );
};

export default ContactModal;