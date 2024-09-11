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
import MesDocuments2 from "./MesDocuments2";

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
    if (fileName?.split(".")[1])
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
    <Box className=" h-full">
      <MesDocuments2 />
    </Box>
  );
};

export default MesDocuments;
