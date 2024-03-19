import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  InputRightElement,
  InputGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AuthHeader from "../../utils/authorizationHeaders";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface IChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ChangePasswordModal({ isOpen, onClose }: IChangePasswordModalProps) {
  const token = AuthHeader();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    showNewPassword: false,
    showConfirmationNewPassword: false,
  });
  const [error, setError] = useState<string | null>(null);

  const submitChangePassword = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      setError("The passwords do not match");
      return;
    }

    if (
      form.oldPassword === form.confirmNewPassword ||
      form.newPassword === form.oldPassword
    ) {
      setError("The old and new password are the same");
      return;
    }

    const resetPassword = async () => {
      const res = await fetch(
        "http://localhost:8082/UserAccount/changePassword",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        onClose();
      }
      if (res.status === 400) {
        var result = await res.json();
        setError(result.errorMessage);
      }
    };

    resetPassword();
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { value, name } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Change Password</Text>
            {error && (
              <Text fontSize="14px" color="red.700" fontWeight="600">
                {error}
              </Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Current Password</FormLabel>
              <Input
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChangeForm}
                required
                minLength={8}
                type="password"
                placeholder="Current password"
              />
            </FormControl>

            <FormControl>
              <FormLabel>New Password</FormLabel>

              <InputGroup>
                <Input
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChangeForm}
                  required
                  minLength={8}
                  type={form.showNewPassword ? "text" : "password"}
                  placeholder="New password"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setForm((prevState) => ({
                        ...prevState,
                        showNewPassword: !prevState.showNewPassword,
                      }))
                    }
                  >
                    {form.showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Confirm New Password</FormLabel>

              <InputGroup>
                <Input
                  name="confirmNewPassword"
                  value={form.confirmNewPassword}
                  onChange={handleChangeForm}
                  required
                  minLength={8}
                  type={form.showConfirmationNewPassword ? "text" : "password"}
                  placeholder="Confirm new assword"
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setForm((prevState) => ({
                        ...prevState,
                        showConfirmationNewPassword:
                          !prevState.showConfirmationNewPassword,
                      }))
                    }
                  >
                    {form.showConfirmationNewPassword ? (
                      <ViewIcon />
                    ) : (
                      <ViewOffIcon />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              ml={2}
              colorScheme={useColorModeValue(
                "lightPallette.primary",
                "darkPallette.primary"
              )}
              onClick={submitChangePassword}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default ChangePasswordModal;
