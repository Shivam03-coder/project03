import React, { memo } from "react";
import Useravatar from "../../../shared/useravatar/Useravatar";

const AvatarSection = () => {
  return (
    <section>
      <Useravatar size="size-20" />
    </section>
  );
};

export default memo(AvatarSection);
