import React, { useState, useEffect, ChangeEvent } from "react";
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
  Typography,
} from "@mui/material";
import { DocumentModel } from "../../../../Services/Types/DocumetType";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import {
  DocumentIcon,
  ExcelIcon,
  ImageIcon,
  PdfIcon,
  PowerPointIcon,
  WordIcon,
  ZipIcon,
  GenericFileIcon,
} from "./Icons"; // Importez vos icônes personnalisées ici
import AssociationServices from "../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";

const initialDocuments: DocumentModel[] = [
  {
    id: "1",
    name: "nature.jpeg",
    date: "29 Jul 2021",
    size: "12 MB",
    type: "jpeg",
    associationId: "",
    description: "",
    downloadLink: "",
  },
  {
    id: "2",
    name: "report.pdf",
    date: "29 Jul 2021",
    size: "6 MB",
    type: "pdf",
    associationId: "",
    description: "",
    downloadLink: "",
  },
  // Ajoutez plus de documents ici avec différentes extensions
];
const documentTypes: { [key: string]: React.ElementType } = {
  pdf: PdfIcon,
  doc: WordIcon,
  docx: WordIcon,
  xls: ExcelIcon,
  xlsx: ExcelIcon,
  ppt: PowerPointIcon,
  pptx: PowerPointIcon,
  jpg: ImageIcon,
  jpeg: ImageIcon,
  png: ImageIcon,
  gif: ImageIcon,
  zip: ZipIcon,
  default: GenericFileIcon,
};

const MesDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentModel[]>(initialDocuments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [file, setFile] = useState<File>();
  const [sortCriterion, setSortCriterion] =
    useState<keyof DocumentModel>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const file2 = new Blob();

  const [newDocument, setNewDocument] = useState({
    nom: "",
    description: "",
    associationId: "",
    file: file2,
  });

  // Fonction pour gérer les changements de texte
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDocument((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Vérifiez si files est défini et s'il contient des fichiers
    if (event.target.files && event.target.files.length > 0) {
      // Récupérez le premier fichier sélectionné
      const file = event.target.files[0];

      // Créez une URL temporaire pour le fichier
      const fileURL = URL.createObjectURL(file);

      // Mettez à jour l'état avec l'URL du fichier
      setNewDocument((prevState) => ({
        ...prevState,
        chemin: fileURL,
      }));
    }
  };

  const [selectedDocument, setSelectedDocument] =
    useState<DocumentModel | null>(null);

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname.split("/")[3]);
    setNewDocument({
      ...newDocument,
      associationId: location.pathname.split("/")[3],
    });
    Initializepage(location.pathname.split("/")[3]);
  }, []);

  useEffect(() => {
    // Remplacer par la récupération des documents depuis une API
    console.log(documents);
    //setDocuments(initialDocuments);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortCriterion(event.target.value as keyof DocumentModel);
  };

  const handleSortOrderChange = (event: SelectChangeEvent<"asc" | "desc">) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  const handleEditClick = (document: DocumentModel) => {
    setSelectedDocument(document);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (document: DocumentModel) => {
    setSelectedDocument(document);
    setDeleteDialogOpen(true);
  };

  const Initializepage = (associationId: string) => {
    AssociationServices.GetDocumentsByAssociationId(associationId)
      .then((response) => {
        console.log(response.data);

        setDocuments(DocumentModel.constructData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteDocument = (documentId: string, associationId: string) => {
    console.log("Moi deleteDocument je suis appélé");
    AssociationServices.DeleteDocument(documentId, associationId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownloadClick = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    //link.target = '_blank'
    const fileName = url.split("/").pop();
    if(fileName?.split(".")[1])
    // Définissez l'attribut `download` pour indiquer un téléchargement direct
    link.setAttribute("download", fileName ? fileName : "");

    // Ajoutez le lien au DOM, déclenchez le clic, puis retirez-le
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddDocument = () => {
    setAddDialogOpen(true);
    console.log(newDocument);
    const formData = new FormData();
    formData.append("associationId", newDocument.associationId);
    formData.append("nom", newDocument.nom);
    formData.append("description", newDocument.description);
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
      setNewDocument({...newDocument, file:file})
      console.log(newDocument)
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

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const sortedDocuments = [...documents].sort((a, b) => {
    const valueA = a[sortCriterion] ?? "";
    const valueB = b[sortCriterion] ?? "";
    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Box className="bg-white h-full p-4">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Select value={sortCriterion} onChange={handleSortChange}>
          <MenuItem value="type">Type</MenuItem>
          <MenuItem value="name">Nom</MenuItem>
          <MenuItem value="date">Date</MenuItem>
        </Select>
        <Box display={"flex"} gap={"4"} justifyContent="space-between">
          <Select value={sortOrder} onChange={handleSortOrderChange}>
            <MenuItem value="asc">Croissant</MenuItem>
            <MenuItem value="desc">Décroissant</MenuItem>
          </Select>
          <button
            onClick={handleAddDocument}
            className="text-white ml-4 bg-red-600 hover:bg-red-800 rounded-lg p-3"
          >
            <AddIcon />
          </button>
        </Box>
      </Box>

      {documents.length == 0 ? (
        <div className="text-center text-lg font-bold">
          Vous n'avez aucun documents pour le moment !!!
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Icone</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Taille</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDocuments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((doc) => {
                  const Icon = documentTypes[doc.type] || documentTypes.default;
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Icon />
                      </TableCell>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <Tooltip title="Editer">
                          <IconButton onClick={() => handleEditClick(doc)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton onClick={() => handleDeleteClick(doc)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Télécharger">
                          <IconButton
                            onClick={() =>
                              handleDownloadClick(doc.downloadLink)
                            }
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={documents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modale pour ajouter un document */}
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Ajouter un document</DialogTitle>
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
              setNewDocument({ ...newDocument, description: e.target.value });
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              ":hover": { backgroundColor: "ff0000" },
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
              <Typography variant="body2" color="textSecondary" marginTop={2}>
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
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Annuler
          </Button>
          <Button
            onClick={() => handleUpload()}
            color="primary"
            disabled={!newDocument.nom}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modale pour éditer un document */}
      {selectedDocument && (
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Editer le document</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              label="Nom"
              fullWidth
              value={selectedDocument?.name || ""}
              onChange={(e) =>
                setSelectedDocument((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                )
              }
            />
            <TextField
              margin="normal"
              label="Description"
              fullWidth
              multiline
              value={selectedDocument?.description || ""}
              onChange={(e) =>
                setSelectedDocument((prev) =>
                  prev ? { ...prev, description: e.target.value } : null
                )
              }
            />
            <Button variant="contained" component="label">
              Changer le document
              <input type="file" hidden />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={() => setEditDialogOpen(false)} color="primary">
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Modale pour confirmer la suppression */}
      {selectedDocument && (
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            Voulez-vous vraiment supprimer ce document ?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button
              onClick={() => {
                deleteDocument(
                  selectedDocument.id,
                  selectedDocument.associationId
                );
                setDocuments(
                  documents.filter((doc) => doc.id !== selectedDocument.id)
                );
                setDeleteDialogOpen(false);
                
              }}
              color="primary"
            >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default MesDocuments;
