import { useEffect, useState } from "react";
import { BASE_URL } from "../API";
import { METHODS } from "http";

// FONCTION POUR FAIRE UN GET DES DONNEES
export const useFetchData = (url: string) => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { isLoading, data, error };
};
// FONCTION POUR FAIRE UN POST DES DONNEES
export const usePostData = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const postData = async (body: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { postData, data, error, loading };
};
