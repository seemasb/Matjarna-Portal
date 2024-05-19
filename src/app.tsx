import Router from "./router";
import { Suspense, lazy, useEffect, useState } from "react";
import Notification from "./base-components/Notification";
import Lucide from "./base-components/Lucide";
import LoadingIcon from "./base-components/LoadingIcon";
import authService from "./services/authService";
import { registerPlugin } from "react-filepond";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "./matjarnaPages/Users/api";
import { setUser } from "./stores/userSlice";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { showFailToast } from "./common/toasts";
import { useTranslation } from "react-i18next";
import { isEmptyObject } from "tom-select/src/vanilla";
import AuthRouter from "./authRouter/auth";

/* These plugins are used for the Filepond component which is used to
upload multiple images, once registering the plugins they are applied to the component.
More on Filepond plugins: https://pqina.nl/filepond/docs/api/plugins/ */
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const initializeUserInfo = async () => {
      if (authService.loadToken()) {
        setLoading(true);
        const response = await getUserInfo();
        if (response.status < 300) {
          dispatch(setUser(response.data));
        } else {
          showFailToast(t("global.generalError"));
        }
        setLoading(false);
      }
    };
    initializeUserInfo();
  }, []);

  const isAuth = !isEmptyObject(
    useSelector((state: any) => state.user.userInfo)
  );

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <LoadingIcon
            icon="spinning-circles"
            className="w-8 h-8"
            color="white"
          />
        </div>
      }
    >
      {!loading && (isAuth ? <Router /> : <AuthRouter />)}
      {/* BEGIN: Success Notification Content */}
      <Notification id="success-notification-content" className="flex hidden">
        <Lucide icon="CheckCircle" className="text-success" />
        <div className="ml-4 mr-4">
          <div id="success-notification" className="font-medium"></div>
        </div>
      </Notification>
      {/* END: Success Notification Content */}
      {/* BEGIN: Failed Notification Content */}
      <Notification id="failed-notification-content" className="flex hidden">
        <Lucide icon="XCircle" className="text-danger" />
        <div className="ml-4 mr-4">
          <div id="fail-notification" className="font-medium"></div>
        </div>
      </Notification>
      {/* END: Failed Notification Content */}
    </Suspense>
  );
}
export default App;
