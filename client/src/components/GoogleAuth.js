import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const navigate = useNavigate();

  const handleSuccessfulLogin = async (cred) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_DEV}google-auth`,
        cred
      );
      if (response?.data?.payload) {
        console.log("redirect to home page");
        navigate("/home");
      }
    } catch (err) {
      console.log("error: ", err);
      navigate("/");
    }
  };

  const handleFailedLogin = (err) => {
    console.log("Login failed: ", err);
    alert("Authentication failed. Please try again.");
    navigate("/");
  };

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) =>
        handleSuccessfulLogin(credentialResponse)
      }
      onError={(err) => handleFailedLogin(err)}
      //   useOneTap
      //   auto_select
    />
  );
}
