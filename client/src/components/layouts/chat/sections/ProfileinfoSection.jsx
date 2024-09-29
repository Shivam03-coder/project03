import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Useravatar from "../../../shared/useravatar/Useravatar";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { ProfileIcon } from "../../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../../../redux/endpoints/userauth";

import Logout from "../../../features/auth/Logout";

const ProfileinfoSection = () => {
  const userdata = useSelector((state) => state.userinfo.userdata);

  const [LogoutUser] = useLogoutUserMutation();

  const Userdata = useMemo(
    () => ({
      _id: userdata?._id || "",
      fullname: userdata?.fullname || "",
      email: userdata?.email || "",
    }),
    [userdata]
  );

  return (
    <section className="absolute z-50 bottom-0 left-0 h-16 w-full flex gap-2 items-center justify-center p-5">
      <Popover
        placement="top-end"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button className="p-0 rounded-full">
            <Useravatar size="size-12" />
          </Button>
        </PopoverHandler>
        <PopoverContent className="bg-black text-white flex flex-col gap-3">
          <Link
            to="/profile/:1234"
            className="flex-center gap-3 text-customYellow-300 cursor-pointer font-medium"
          >
            <ProfileIcon className="size-7 text-customYellow-400" />
            PROFILE
          </Link>
          <Logout LogoutUser={LogoutUser} />
        </PopoverContent>
      </Popover>
      <div>
        <Typography variant="h6" className="uppercase">
          {Userdata.fullname}
        </Typography>
        <Typography className="text-xs">{Userdata.email}</Typography>
      </div>
    </section>
  );
};

export default ProfileinfoSection;
