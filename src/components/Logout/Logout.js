import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
    const { user, userLogout } = useContext(AuthContext);

  useEffect(() => {
    userLogout();
    // authService
    //   .logout(user.id)
    //   .then(() => {
    //     userLogout();
    //     navigate("/");
    //   })
    //   .catch(() => {
    //     navigate("/");
    //   });
  });
  return null;
};

export default Logout;
