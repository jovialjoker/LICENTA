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
import { GrUserAdmin, GrUserNew } from "react-icons/all";
import { DeleteIcon, UnlockIcon, LockIcon } from "@chakra-ui/icons";
import axios from "axios";
import AuthHeader from "../../../utils/authorizationHeaders";
import { url } from "../../../env";

interface IUser {
  userId: string;
  name: string;
  email: string;
  username: string;
  isDeleted: boolean;
  isAdmin: boolean;
}
const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const { data } = await axios({
        method: "get",
        url: `${url}Admin/getAllUsers`,
        headers: {
          Authorization: AuthHeader(),
        },
      });
      setUsers(data);
      setLoading(false);
    };

    getUsers();
  }, []);

  const handleMakeAdminClick = async (userId: string) => {
    console.log(`Make admin clicked for user with ID ${userId}`);
    let user = users.find((u) => u.userId == userId);
    if (user) {
      await axios.post(
        `${url}UserAccount/MakeAdmin`,
        JSON.stringify({ id: userId, isAdmin: !user.isAdmin }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthHeader(),
          },
        }
      );
      let newUsers = users.filter((u) => u.userId != userId);
      setUsers([...newUsers, { ...user, isAdmin: !user.isAdmin }]);
    }
  };

  const handleDeleteClick = async (userId: string) => {
    let user = users.find((u) => u.userId == userId);
    if (user) {
      await axios.post(
        `${url}UserAccount/${user.isDeleted ? "ActivateUser" : "DisableUser"}`,
        userId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthHeader(),
          },
        }
      );
      let newUsers = users.filter((u) => u.userId != userId);
      setUsers([...newUsers, { ...user, isDeleted: !user.isDeleted }]);
    }
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
                  {user.isAdmin ? (
                    <Tooltip title="Remove admin">
                      <IconButton
                        aria-label="remove admin"
                        onClick={() =>
                          handleMakeAdminClick(user.userId.toString(10))
                        }
                      >
                        <GrUserNew />
                      </IconButton>
                    </Tooltip>
                  ) : (
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
                  )}

                  {user.isDeleted ? (
                    <Tooltip title="Activate user">
                      <IconButton
                        aria-label="activate user"
                        onClick={() =>
                          handleDeleteClick(user.userId.toString(10))
                        }
                      >
                        <UnlockIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Disable user">
                      <IconButton
                        aria-label="delete user"
                        onClick={() =>
                          handleDeleteClick(user.userId.toString(10))
                        }
                      >
                        <LockIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersPage;
