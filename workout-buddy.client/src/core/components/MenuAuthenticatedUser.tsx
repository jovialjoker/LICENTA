import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ChangePasswordModal from "./ChangePasswordModal";

interface IMenuAuthenticatedUserProps {
  username: string;
  logoutHandler: () => void;
}

function MenuAuthenticatedUser({
  username,
  logoutHandler,
}: IMenuAuthenticatedUserProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <React.Fragment>
      <Text>Hello, </Text>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <p>{username}</p>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
              }}
              href={`https://localhost:3000/user-edit`}
            >
              My profile
            </Link>
          </MenuItem>

          <MenuItem>
            <Text
              as="button"
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
              }}
              onClick={onOpen}
            >
              Change password
            </Text>
          </MenuItem>

          <MenuDivider />
          <MenuItem onClick={logoutHandler}>Sign Out</MenuItem>
        </MenuList>
      </Menu>

      <ChangePasswordModal isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
}

export default MenuAuthenticatedUser;
