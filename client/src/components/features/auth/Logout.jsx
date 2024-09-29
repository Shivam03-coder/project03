import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../../../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { memo, useCallback } from "react";
import Cookie from "js-cookie"; // Ensure this is imported if you are managing cookies

const Logout = ({ LogoutUser }) => {
  const navigate = useNavigate(); // Corrected spelling

  const handleUserLogout = useCallback(async () => {
    try {
      const resp = await LogoutUser().unwrap();
      if (resp.status === "success") {
        toast.success(resp.message);
        Cookie.remove("isUserAuthenticated"); 
        window.location.reload(); 
        navigate("/auth"); 
        console.log("LOGOUT")
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again."); 
    }
  }, [LogoutUser, navigate]); 

  return (
    <div
      onClick={handleUserLogout}
      className="flex-center text-xl gap-3 text-customOrange-600 cursor-pointer font-medium"
    >
      <LogoutIcon className="size-9 text-customOrange-600" />
      LOGOUT
    </div>
  );
};

export default memo(Logout);
