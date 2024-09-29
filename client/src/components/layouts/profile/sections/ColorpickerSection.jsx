import { memo, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch } from "react-redux";
import { setUserAvatarprops } from "../../../../redux/state/userprofileState";

const ColorpickerSection = () => {
  const [color, setColor] = useState("#aabbcc");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserAvatarprops(color));
  }, [color]);

  return (
    <section className="flex-center flex-col gap-5">
      <HexColorPicker color={color} onChange={setColor} />
    </section>
  );
};

export default memo(ColorpickerSection);
