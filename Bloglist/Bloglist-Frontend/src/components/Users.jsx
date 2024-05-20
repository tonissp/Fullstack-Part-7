import React from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const Users = ({ users }) => (
  <div>
    <h2>Users</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>Blogs created: {user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default Users;
