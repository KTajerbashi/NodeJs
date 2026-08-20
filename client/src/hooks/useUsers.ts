import { useEffect, useState } from "react";

import userService from "../services/userService";

function useUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      try {
        const data = await userService.getAll();

        if (!cancelled) {
          setUsers(data);
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
    users,
    setUsers,
    loading,
    error,
    setError,
  };
}

export default useUsers;
