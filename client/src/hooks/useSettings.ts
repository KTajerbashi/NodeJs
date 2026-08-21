import { useEffect, useState } from "react";

import settingSerivce from "../services/settingService";

function useSettings() {
  const [data, setData] = useState<ISetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const data = await settingSerivce.getAll();

        if (!cancelled) {
          setData(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setError("Failed to load RoleData.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    data,
    setData,
    loading,
    error,
    setError,
  };
}

export default useSettings;
