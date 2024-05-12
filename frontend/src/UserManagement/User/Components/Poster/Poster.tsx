import React, { useEffect } from "react";
import { usePostData } from "../../../../Utils/Hooks";

type Props = {};

const Poster = (props: Props) => {
  // url pour faire un post des informations "submit"
  const { postData, data, loading, error } = usePostData("submit");

  useEffect(() => {
    console.log(data);
  }, [data]);

  const soumettreFormulaire = () => {
    // Données du formulaire
    const formData = {};
    async function fetch() {
      await postData(formData); // Appel de PostData pour soumettre les données du formulaire
    }
    fetch();
  };

  if (loading) {
    return <p>Attendre...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <div>{/* Données du formulaire */}</div>;
};

export default Poster;
