import { Box } from "@mui/material";
import { DocumentModel } from "../../../../Services/Types/DocumetType";
import ListeDocuments from "./ListeDocuments";
import { useEffect, useState } from "react";
import AssociationServices from "../../../../Services/AssociationServices";
import { useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";

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
    
    const [documents, setDocuments]=useState<DocumentModel[]>(initialDocuments)
    const location = useLocation();

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

  useEffect(()=>{
    Initializepage(location.pathname.split("/")[3])
  })

  const [documentList, setDocumentList] =
    useState<DocumentModel[]>(initialDocuments);

  const deleteDocument = (doc: DocumentModel) => {
    console.log(doc);
    setDocumentList(documentList.filter((item) => item.id != doc.id));
  };

  return (
    <div>
      <Box m={0}>
        <div className="hidden lg:block">
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
            <h1 className="">Mes Dettes</h1>
          </Box>
        </div>
        <ListeDocuments
          handleDelete={(doc: DocumentModel) => deleteDocument(doc)}
          data={documentList}
        />
      </Box>
    </div>
  );
};

export default MesDocuments2;
