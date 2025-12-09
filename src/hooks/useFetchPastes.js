import { useState, useEffect } from "react";
import service from "../appwrite/config";

export default function useFetchPastes(userId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPastes = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await service.getAllCodePastesList(userId);
      setData(res.documents);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Optionally, fetch data automatically on mount
  useEffect(() => {
    if (userId) fetchPastes();
  }, [userId]);

  return { data, loading, error, fetchPastes };
}
