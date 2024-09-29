import { Typography } from "@material-tailwind/react";
import { Discuss } from "react-loader-spinner";
import { OpenChat } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setShowSidebar } from "../../../redux/state/drawerState";
import { useCallback } from "react";
import Logout from "../../features/auth/Logout";
import { useLogoutUserMutation } from "../../../redux/endpoints/userauth";

function Chatloading() {
  const { showSideBar } = useSelector((state) => state.drawer);

  const dispatch = useDispatch();
  const [LogoutUser] = useLogoutUserMutation();

  const handleSidebar = useCallback(() => {
    dispatch(setShowSidebar(!showSideBar));
  }, [dispatch]);

  return (
    <section className="w-full h-screen flex flex-col bg-black">
      <div className=" block md:hidden  min-h-[10vh] text-customOrange-600 ">
        <span className="flex items-center h-full justify-between px-7 py-7">
          <OpenChat
            onClick={handleSidebar}
            className="size-10 cursor-pointer"
          />
          <Logout LogoutUser={LogoutUser} />
        </span>
      </div>
      <div className=" flex-1 flex-center flex flex-col md:flex-row gap-2 ">
        <Discuss
          visible={true}
          height="130"
          width="130"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#FF71CD"
          backgroundColor="#F4442E"
        />
        <Typography className="text-secondary-300" variant="h2">
          WELOCOME TO <br /> CHAT BOX
        </Typography>
      </div>
    </section>
  );
}

export default Chatloading;
