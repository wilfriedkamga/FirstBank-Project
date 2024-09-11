import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { DocumentModel } from "../../../../Services/Types/DocumetType";
import ListeDocuments from "./ListeDocuments";
import { useEffect, useState } from "react";
import AssociationServices from "../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { Add } from "@mui/icons-material";

const initialDocuments: DocumentModel[] = [
  {
    id: "1",
    name: "nature.jpeg",
    date: "29 Jul 2021",
    size: "12 MB",
    type: "jpeg",
    associationId: "",
    description:
      "Ici c'est ce que nous avons eu comme échange avec les  membres de la banque",
    downloadLink: "",
  },
  {
    id: "2",
    name: "report.pdf",
    date: "29 Jul 2021",
    size: "6 MB",
    type: "pdf",
    associationId: "",
    description:
      "Ici c'est le rapport des réunions que nous avons eu avec les encadreurs de la banque.",
    downloadLink: "",
  },
  // Ajoutez plus de documents ici avec différentes extensions
];
const MesDocuments2 = () => {
  const [documents, setDocuments] = useState<DocumentModel[]>(initialDocuments);
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [file, setFile] = useState<File>();
  const [sortCriterion, setSortCriterion] =
    useState<keyof DocumentModel>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [newDocument, setNewDocument] = useState({
    nom: "",
    description: "",
    associationId: "",
    file: file,
  });
  const Initializepage = (associationId: string) => {
    AssociationServices.GetDocumentsByAssociationId(associationId)
      .then((response) => {
        console.log(response.data);
        setDocumentList(DocumentModel.constructData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Initializepage(location.pathname.split("/")[3]);
  });

  const [documentList, setDocumentList] =
    useState<DocumentModel[]>(initialDocuments);

  const deleteDocument = (doc: DocumentModel) => {
    console.log(doc);
    setDocumentList(documentList.filter((item) => item.id != doc.id));
  };
  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };
  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
    }
  };
  const handleUpload = () => {
    const formData = new FormData();
    if (file) {
      formData.append("associationId", newDocument.associationId);
      formData.append("nom", newDocument.nom);
      formData.append("description", newDocument.description);
      formData.append("file", file);
      console.log("nom du fichier " + file.name);
      setNewDocument({ ...newDocument, file: file });
      console.log(newDocument);
      AssociationServices.Upload_file_for_association(newDocument)
        .then((response) => {
          console.log("Voici la reponse que nous avons reçu", response);
          const newDocument2: DocumentModel = {
            id: response.data.id,
            name: "nature.jpeg",
            date: "29 Jul 2021",
            size: "12 MB",
            type: "jpeg",
            associationId: "",
            description: "",
            downloadLink: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <Box>
        <Box
          sx={{
            marginBottom: "12px",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#dc2626",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: 2,
            border: "1px solid gray",
          }}
        >
          <h1 className="">Les documents de l'association</h1>
        </Box>
        <Box sx={{ display: "flex", margin: 1, justifyContent: "end" }}>
          <Button
            onClick={() => setAddDialogOpen(true)}
            variant="contained"
            sx={{
              padding: 1,
              backgroundColor: "#c00",
              "&:hover": { backgroundColor: "#b00", color: "white" },
              "&:disabled": { backgroundColor: "#c00", color: "gray" },
            }}
          >
            <Add /> Ajouter
          </Button>

          <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
            <DialogTitle
              sx={{
                padding: 1,
                backgroundColor: "#c00",
                color:"white",
                "&:hover": { backgroundColor: "#b00", color: "white" },
              }}
            >
              Ajouter un document
            </DialogTitle>
            <Divider />
            <DialogContent>
              <TextField
                margin="normal"
                label="Nom"
                fullWidth
                value={newDocument.nom}
                onChange={(e) => {
                  setNewDocument({ ...newDocument, nom: e.target.value });
                }}
              />
              <TextField
                margin="normal"
                label="Description"
                fullWidth
                multiline
                value={newDocument.description}
                onChange={(e) => {
                  setNewDocument({
                    ...newDocument,
                    description: e.target.value,
                  });
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#c00",
                  "&:hover": { backgroundColor: "#a00", color: "white" },
                }}
                component="label"
              >
                Choisir le document
                <input
                  type="file"
                  hidden
                  onChange={(event) => handleInputFileChange(event)}
                />
              </Button>
              {file && (
                <>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    marginTop={2}
                  >
                    Document sélectionné : {(file as File).name}
                  </Typography>
                  <div className="loading-bar bg-gray-300 mt-2.5 w-[200px] h-2">
                    <div
                      style={{ width: "20%" }}
                      className="loading bg-red-700 w-[] h-2"
                    ></div>
                  </div>
                </>
              )}
            </DialogContent>
            <Divider />
            <DialogActions sx={{ padding: 1 }}>
              <Button
                sx={{
                  backgroundColor: "#c00",
                  color:"white",
                  "&:hover": { backgroundColor: "#a00",color:"white" },
                }}
                onClick={handleAddDialogClose}
             
              >
                Annuler
              </Button>
              <Button
                sx={{
                  backgroundColor: "#c00",
                  color:"white",
                  "&:hover": { backgroundColor: "#a00",color:"white" },
                  "&:disabled": { backgroundColor: "#aaa",color:"white" }
                }}
                onClick={() => handleUpload()}
                
                disabled={!newDocument.nom}
              >
                Ajouter
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <ListeDocuments
          handleDelete={(doc: DocumentModel) => deleteDocument(doc)}
          data={documentList}
        />
      </Box>
    </div>
  );
};

export default MesDocuments2;
