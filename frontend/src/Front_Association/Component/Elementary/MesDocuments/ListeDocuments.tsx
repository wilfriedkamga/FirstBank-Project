import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import {
  Download,
  Delete,
  Add,
  Details,
  DocumentScannerSharp,
  Edit,
} from "@mui/icons-material";
import { DocumentModel } from "../../../../Services/Types/DocumetType";
import MUIDatatable from "../maTontine/MUIDatatable";
import EditButton from "./ButonAction/EditButton";
import DownloadButton from "./ButonAction/DownloadButton";
import DeleteButton from "./ButonAction/DeleteButton";
import {
  DocumentIcon,
  ExcelIcon,
  ImageIcon,
  PdfIcon,
  PowerPointIcon,
  WordIcon,
  ZipIcon,
  GenericFileIcon,
} from "./Icons";

interface Props {
  data: DocumentModel[];
  handleDelete: (doc: DocumentModel) => void;
}
const ListeDocuments = ({ data, handleDelete }: Props) => {
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
  
  const handleDeleteClick = (document: DocumentModel) => {
    console.log(document.id);
  };

  const columns: GridColDef<DocumentModel>[] = [
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => (
        
        <Box sx={{ display: "flex", gap: 2 }}>
             
          <IconButton onClick={() => null}>
           
          </IconButton>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Nom du document",
      flex: 1,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
    },
    {
      field: "size",
      headerName: "Taille",
      flex: 1,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date d'ajout ",
      flex: 1,
      editable: true,
    },
    {
      field: "action",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* <Button variant="contained">Détails</Button>
          <Button variant="contained" color="warning">Modifier</Button>
          <Button variant="contained" color="error">Supprimer</Button> */}

          <IconButton onClick={() => null}>
            <DownloadButton doc={params.row} handleDownload={() => null} />
          </IconButton>
          <IconButton onClick={() => null}>
            <EditButton
              doc={params.row}
              handleSave={() => handleDelete(params.row)}
            />
          </IconButton>
          <IconButton>
            <DeleteButton
              doc={params.row}
              handleDelete={() => handleDelete(params.row)}
            />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <div className="">
        <MUIDatatable<DocumentModel> columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ListeDocuments;
