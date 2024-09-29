import React, { useCallback, useEffect, useState } from "react";
import { ChatIcon } from "../../../../constants";
import { Drawer, Typography } from "@material-tailwind/react";
import ProfileinfoSection from "./ProfileinfoSection";
import DirectmessageSection from "./DirectmessageSection";
import { useGetContactlistQuery } from "../../../../redux/endpoints/userauth";
import LastmsgContactSection from "./LastmsgContactSection";
import { getRandomColor } from "../../../../utils/getRandomcolorCode";
import { useDispatch, useSelector } from "react-redux";
import { useMediaquery } from "../../../../hooks/useMediaQuerry";
import { setShowSidebar } from "../../../../redux/state/drawerState";
import MobileViewProfileSection from "./MobileViewProfileSection";

const ContactListSection = () => {
  const { data } = useGetContactlistQuery();
  const [contactList, setContactList] = useState([]);
  const { selectedChatData } = useSelector((state) => state.chats);
  const isMobileView = useMediaquery(750);
  const { showSideBar } = useSelector((state) => state.drawer);
  const dispatch = useDispatch();
  const closeDrawer = useCallback(() => {
    dispatch(setShowSidebar(false));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const updatedContactList = data.map((contactInfo) => ({
        ...contactInfo,
        avatarColor: getRandomColor(),
      }));
      setContactList(updatedContactList);
    }
  }, [data]);

  if (isMobileView) {
    return (
      <Drawer
        open={showSideBar}
        onClose={closeDrawer}
        placement="left"
        className="bg-primary-950 text-white"
      >
        <div className="flex justify-center items-center gap-3 p-3">
          <ChatIcon className="size-8 text-secondary-300" />
          <Typography variant="h4" className="text-secondary-400">
            CHAT-BOX
          </Typography>
        </div>
        <DirectmessageSection />
        <LastmsgContactSection
          selectedChatData={selectedChatData}
          contactList={contactList}
        />
        <MobileViewProfileSection />
      </Drawer>
    );
  }

  return (
    <section
      className="h-screen overflow-y-auto relative text-left min-w-[330px]
      scroll-smooth bg-primary-950 text-white hidden lg:block"
    >
      <div className="flex justify-center items-center gap-3 p-3">
        <ChatIcon className="size-8 text-secondary-300" />
        <Typography variant="h4" className="text-secondary-400">
          CHAT-BOX
        </Typography>
      </div>
      <DirectmessageSection />
      <LastmsgContactSection
        selectedChatData={selectedChatData}
        contactList={contactList}
      />
      <ProfileinfoSection />
    </section>
  );
};

export default ContactListSection;
