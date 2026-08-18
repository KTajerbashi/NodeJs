import { useState } from "react";

import authService from "../../services/authService";
// import userService from "../../services/userService.ts";

import "./Users.css";
import DataGrid from "../../components/DataGrid/DataGrid";

function Users() {

  const [users] = useState<IUser[]>(() => authService.getAllUsers());
  // const [users_] = useState<IUser[]>(() => userService.getAll());

  const handleEdit = (user: IUser) => {
    console.log("Edit", user);
  };

  const handleDelete = (user: IUser) => {
    console.log("Delete", user);
  };

  const handleView = (user: IUser) => {
    console.log("View", user);
  };

  const handleRowClick = (user: IUser) => {
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
