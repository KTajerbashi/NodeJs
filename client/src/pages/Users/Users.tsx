import { useState } from "react";

import authService from "../../services/authService";

import "./Users.css";
import DataGrid from "../../components/DataGrid/DataGrid";

function Users() {
  // const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   const data = authService.getAllUsers();
  //   setUsers(data);
  // }, []);

  const [users] = useState<User[]>(() => authService.getAllUsers());

  const handleEdit = (user: User) => {
    console.log("Edit", user);
  };

  const handleDelete = (user: User) => {
    console.log("Delete", user);
  };

  const handleView = (user: User) => {
    console.log("View", user);
  };

  const handleRowClick = (user: User) => {
    console.log("Row clicked", user);
  };

  const columns = [
    {
      key: "id",
      title: "ID",
    },

    {
      key: "firstName",
      title: "FirstName",
    },

    {
      key: "email",
      title: "Email",
    },
  ] as const;

  return (
    <DataGrid
      columns={columns}
      data={users}
      onRowClick={handleRowClick}
      actions={[
        {
          label: "View",
          className: "primary",
          onClick: handleView,
        },
        {
          label: "Edit",
          className: "success",
          onClick: handleEdit,
        },
        {
          label: "Delete",
          className: "danger",
          onClick: handleDelete,
        },
      ]}
    />
  );
}

export default Users;
