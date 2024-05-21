import React from "react";
import { useFetchData } from "./index";

const Test = () => {
  const { isLoading, data, error } = useFetchData("http://localhost:8088/api/usermanagement/signup");


  return (
    <div>
      {/* Utilisez les données récupérées ici */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Test;