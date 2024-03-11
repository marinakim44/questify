import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/userSlice";

export default function GoogleAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSuccessfulLogin = async (cred) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_DEV}api/v1/users/google-auth`,
        cred
      );
      if (response?.data?.payload) {
        dispatch(login(response.data));

        navigate("/home");
      }
    } catch (err) {
      console.log("error: ", err);
      if (err.response.status === 401) {
        alert("You are not authorized to view this page");
      }
      navigate("/");
    }
  };

  const handleFailedLogin = (err) => {
    console.log("Login failed: ", err);
    alert("Authentication failed. Please try again.");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-20 m-auto">
      <GoogleLogin
        onSuccess={(credentialResponse) =>
          handleSuccessfulLogin(credentialResponse)
        }
        onError={(err) => handleFailedLogin(err)}
        useOneTap
      />
    </div>
  );
}
