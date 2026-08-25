import { useEffect, useState } from "react";

import userService from "../services/userService";

function useUsers() {
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      try {
        const data = await userService.onReadAll<IUser[]>("");

        if (!cancelled) {
          setData(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setError("Failed to load users.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

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

export default useUsers;
