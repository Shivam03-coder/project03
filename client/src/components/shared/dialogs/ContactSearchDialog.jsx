import React, { memo, useCallback, useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

import { ChatIcon } from "../../../constants";

import { useUserContactsListMutation } from "../../../redux/endpoints/userauth";

import debounce from "lodash.debounce";
import SearchedList from "./SearchedList";

function ContactSearchDialog({ showDialog, setShowDialog }) {
  const [SearchedItem, setSearchedItem] = useState("");
  const [searchedContactList, setSearchedContactList] = useState([]);

  const [getContactList, { isLoading }] = useUserContactsListMutation();

  const toggleDialog = useCallback(() => setShowDialog((prev) => !prev), []);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query) {
        try {
          const response = await getContactList({
            SerachedcontactInfo: query,
          }).unwrap();

          if (response.status === "success") {
            setSearchedContactList(response.data);
          }
        } catch (err) {
          console.error("Failed to fetch contacts:", err);

          setSearchedContactList([]);
        }
      } else {
        setSearchedContactList([]);
      }
    }, 500),
    [getContactList]
  );

  const handleSearch = useCallback(
    (e) => {
      setSearchedItem(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  return (
    <Dialog
      className="text-white bg-black border border-secondary-300 min-h-60"
      open={showDialog}
      handler={toggleDialog}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>
        <input
          placeholder="Search contacts..."
          onChange={handleSearch}
          value={SearchedItem}
          className="flex-1 p-3 rounded-2xl bg-primary-600 text-white font-Inter font-normal text-xl outline-none"
          type="text"
        />
      </DialogHeader>
      <DialogBody>
        {isLoading && (
          <div className="flex-center">
            <ChatIcon className="size-16 text-customYellow-300" />
          </div>
        )}
        {searchedContactList.length === 0 && !isLoading && (
          <div className="flex justify-center p-3 gap-5 items-center">
            <ChatIcon className="size-12 text-secondary-300" />
            <Typography variant="h2" className="text-secondary-400">
              CHAT-BOX
            </Typography>
          </div>
        )}
        {searchedContactList.length !== 0 && (
          <SearchedList setShowDialog={setShowDialog} searchedContactList={searchedContactList} />
        )}
      </DialogBody>
    </Dialog>
  );
}

export default memo(ContactSearchDialog);
