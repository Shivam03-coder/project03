import React, { useEffect, useState } from "react";
import Loginform from "../features/auth/Loginform";
import { Signupform } from "../features/auth/Signupform";
import { useSelector } from "react-redux";

function Authpage() {
  const user = false;
  const { UserRegisterd } = useSelector((state) => state.user);

  const [isuserRegistered, setIsuserRegistered] = useState(
    UserRegisterd ? true : false
  );

  const [showPassword, setShowpassword] = useState(false);

  useEffect(() => {
    if (UserRegisterd) {
      setIsuserRegistered(true);
    } else {
      setIsuserRegistered(false);
    }
  }, [UserRegisterd, isuserRegistered]);
  return (
    <>
      <div className="flex-center h-screen !text-white  place-items-center">
        {isuserRegistered ? (
          <Loginform
            showPassword={showPassword}
            setShowpassword={setShowpassword}
          />
        ) : (
          <Signupform
            showPassword={showPassword}
            setShowpassword={setShowpassword}
          />
        )}
      </div>
    </>
  );
}

export default Authpage;
