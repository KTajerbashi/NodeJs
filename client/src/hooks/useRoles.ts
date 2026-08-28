import { useEffect, useState } from "react";

import roleService from "../services/roleService";

function useRoles() {
  const [data, setData] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const response = await roleService.onReadAll<IRole[]>();

        if (!cancelled) {
          setData(response.data);
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

export default useRoles;
