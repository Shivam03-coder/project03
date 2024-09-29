import { lazy } from "react";

const Homepage = lazy(() => import("../components/pages/Homepage"));
const Authpage = lazy(() => import("../components/pages/Authpage"));
const StudentPage = lazy(() => import("../components/pages/StudentPage"));

export const publicRoutes = [
  {
    path: "/",
    element: <Homepage />,
    children: [
      {
        path: "auth",
        element: <Authpage />,
      },
    ],
  },
];

export const privateRoutes = [
  {
    path: "/studentfee/:userid",
    element: StudentPage,
  },
];
