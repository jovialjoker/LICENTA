import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableContainer,
  Button,
  IconButton,
  Tooltip,
  AlertDialog,
  Spinner,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Tr,
  Td,
  Tbody,
  Thead,
} from "@chakra-ui/react";
import { GrUserAdmin } from "react-icons/all";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import AuthHeader from "../../../utils/authorizationHeaders";

const UsersPage = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cancelRef = useRef(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const { data } = await axios({
        method: "get",
        url: "http://localhost:8082/Admin/getAllUsers",
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setUsers(data);
      setLoading(false);
    };

    getUsers();
  }, []);

  const handleMakeAdminClick = (userId: string) => {
    console.log(`Make admin clicked for user with ID ${userId}`);
  };

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteDialogConfirm = () => {
    console.log(`Delete clicked for user with ID ${selectedUserId}`);
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  return (
    <>
      {loading && <Spinner />}
      <TableContainer
        height="100%"
        overflowY={"scroll"}
        p={{ base: 0, lg: 12 }}
      >
        <Table>
          <Thead fontWeight={"600"} fontSize={"20px"}>
            <Tr>
              <Td display={{ base: "none", xl: "table-cell" }}>User Id</Td>
              <Td>Username</Td>
              <Td>Email</Td>
              <Td>Name</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user: any) => (
              <Tr
                key={user.userId}
                __css={{
                  "&": {
                    "text-wrap": "pretty",
                  },
                  "& > td": {
                    whiteSpace: "normal",
                  },
                }}
              >
                <Td isTruncated display={{ base: "none", xl: "table-cell" }}>
                  {user.userId}
                </Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.name}</Td>
                <Td>
                  <Tooltip title="Make Admin">
                    <IconButton
                      aria-label="make admin"
                      onClick={() =>
                        handleMakeAdminClick(user.userId.toString(10))
                      }
                    >
                      <GrUserAdmin />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete user">
                    <IconButton
                      aria-label="delete user"
                      onClick={() =>
                        handleDeleteClick(user.userId.toString(10))
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        isOpen={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete user</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this user?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleDeleteDialogClose}>Cancel</Button>
              <Button onClick={handleDeleteDialogConfirm} color="red.600">
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default UsersPage;
