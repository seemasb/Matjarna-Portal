import { lazy } from "react";
import ErrorPage from "../pages/ErrorPage";
import { useRoutes } from "react-router-dom";

const Login = lazy(() => import("../matjarnaPages/login"));

const SendEmail = lazy(() => import("../matjarnaPages/SendEmail"));
const ResetPassword = lazy(() => import("../matjarnaPages/ResetPassword"));
const TermsAndConditions = lazy(()=> import("../matjarnaPages/TermsAndConditions"))
const PrivacyPolicy = lazy(() => import("../matjarnaPages/PrivacyPolicy"));

const auth = () => {
  const routes: any = [
    {
      path: "",
      element: <Login />,
    },
    {
      path: "sendEmail",
      element: <SendEmail />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "privacyPolicy",
      element: <PrivacyPolicy />,
    },
    {
      path: "termsAndConditions",
      element: <TermsAndConditions />,
    },
    ,
  ];

  return useRoutes(routes);
};

export default auth;
