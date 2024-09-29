import ms from "ms";

const setTokenscookies = async (res, accessToken, refreshToken, user) => {
  try {
    user.isAuthenticated = true;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: ms("1d"),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: ms("5d"),
    });

    res.cookie("isUserAuthenticated", user.isAuthenticated, {
      httpOnly: false,
      secure: true,
      maxAge: ms("5d"),
    });

  } catch (error) {
    console.log(error);
  }
};

export default setTokenscookies;
