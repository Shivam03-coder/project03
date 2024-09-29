import React from "react";
import AvatarSection from "./sections/AvatarSection";
import ColorpickerSection from "./sections/ColorpickerSection";
import UserinfoSection from "./sections/UserinfoSection";

const ProfileContainer = () => {
  return (
    <div className="w-full z-20 lg:w-[60vw] h-max bg-darken rounded-2xl shadow-glass p-8">
      <div className="flex items-center justify-evenly">
        <div className="flex flex-col items-center justify-center p-4 gap-3">
          <AvatarSection />
          <UserinfoSection />
        </div>
        <ColorpickerSection />
      </div>
    </div>
  );
};

export default ProfileContainer;
