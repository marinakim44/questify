import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/userSlice";

export default function GoogleAuth() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSuccessfulLogin = async (cred) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL_DEV}api/v1/users/google-auth`,
        cred
      );
      if (response?.data?.payload) {
        console.log(response.data);
        dispatch(login(response.data));

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
    <div className="flex justify-center items-center h-20 m-auto">
      <GoogleLogin
        onSuccess={(credentialResponse) =>
          handleSuccessfulLogin(credentialResponse)
        }
        onError={(err) => handleFailedLogin(err)}

        //   useOneTap
        //   auto_select
      />
    </div>
  );
}
