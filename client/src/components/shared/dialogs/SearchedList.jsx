import { Typography } from "@material-tailwind/react";
import React, { memo, useCallback, useEffect, useState } from "react";
import { getRandomColor } from "../../../utils/getRandomcolorCode";
import { useDispatch } from "react-redux";
import {
  setSelectedChatData,
  setSelectedChatType,
} from "../../../redux/state/chatState";

const SearchedList = ({ setShowDialog, searchedContactList }) => {
  const [updateUser, setUpdateUser] = useState([]);
  const dispatch = useDispatch();

  const handleSelectedUser = useCallback(
    (contact) => {
      if (contact) {
        dispatch(setSelectedChatData(contact));
        dispatch(setSelectedChatType("contact"));
        setShowDialog(false);
      }
    },
    [dispatch, setShowDialog]
  );

  useEffect(() => {
    const Users = searchedContactList.map((user) => ({
      ...user,
      avatarColor: getRandomColor(),
      userFirstChar: user?.fullname.charAt(0),
    }));

    setUpdateUser(Users);
  }, [searchedContactList]);

  return (
    <section className="space-y-3">
      {updateUser.map((list,i) => (
        <div
          onClick={() => handleSelectedUser(list)}
          key={i}
          className="flex items-center px-9 gap-3 cursor-pointer"
        >
          <div
            className="border-2 size-14 border-black rounded-full font-Varela text-black text-3xl flex-center uppercase"
            style={{ backgroundColor: list.avatarColor }}
          >
            {list.userFirstChar}
          </div>
          <Typography className="text-white font-Varela uppercase" variant="h5">
            {list.fullname}
          </Typography>
        </div>
      ))}
    </section>
  );
};

export default memo(SearchedList);
