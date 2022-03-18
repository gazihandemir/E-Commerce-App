import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Text, Button } from "@chakra-ui/react";
function Profile({ history }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <Text fontSize={22}>Profile</Text>
      <code>{JSON.stringify(user)}</code>
      <Button colorScheme={"pink"} variant={"solid"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Profile;
