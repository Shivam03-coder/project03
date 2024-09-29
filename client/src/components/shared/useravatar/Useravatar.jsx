import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const Useravatar = ({ size }) => {
  const { userdata } = useSelector((state) => state.userinfo);
  const { userAvatarprops } = useSelector((state) => state.userinfo);

  const firstLetterOfName = useMemo(() => {
    if (userdata) {
      const { fullname } = userdata;
      return fullname.charAt(0);
    }
    return "";
  }, [userdata]);

  return (
    <div
      className={`${size} border-2 border-black rounded-full font-Varela uppercase text-black text-3xl flex-center`}
      style={{ backgroundColor: userAvatarprops?.backgroundColor }}
    >
      {firstLetterOfName || "X"}
    </div>
  );
};

export default Useravatar;
