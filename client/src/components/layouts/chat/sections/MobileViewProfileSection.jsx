import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Useravatar from "../../../shared/useravatar/Useravatar";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Logout from "../../../features/auth/Logout";

const MobileViewProfileSection = () => {
  const userdata = useSelector((state) => state.userinfo.userdata);

  const Userdata = useMemo(
    () => ({
      _id: userdata?._id || "",
      fullname: userdata?.fullname || "",
      email: userdata?.email || "",
    }),
    [userdata]
  );

  return (
    <section className="absolute bottom-0 left-0 h-14 w-full flex gap-2 items-center justify-center p-5 ">
      {" "}
      {/* Added z-index */}
      <Link
        to={`/profile/${Userdata._id}`}
        className="flex-center gap-3 text-customYellow-300 cursor-pointer font-medium"
      >
        <Useravatar size="size-12" />
      </Link>
      <div className="flex flex-col">
        <Typography variant="h6" className="uppercase">
          {Userdata.fullname}
        </Typography>
        <Typography className="text-xs">{Userdata.email}</Typography>
      </div>
    </section>
  );
};

export default MobileViewProfileSection;
