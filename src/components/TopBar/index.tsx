import Lucide from "../../base-components/Lucide";
import { Menu } from "../../base-components/Headless";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../stores/userSlice";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../common/constants";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const fullUrl = userInfo.profilePicture
    ? BASE_URL + userInfo.profilePicture
    : `https://ui-avatars.com/api/?background=random&length=1&name=${userInfo.firstName}`;

  const handleLogout = () => {
    authService.removeToken();
    dispatch(deleteUser());
    navigate("/", { replace: true });
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleChangePassword = () => {
    navigate("/changePassword");
  };

  return (
    <div className="h-[67px] z-[51] flex items-center justify-end relative border-b border-slate-200">
      <Menu>
        <Menu.Button className="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x">
          <img alt="Profile picture" src={fullUrl} />
        </Menu.Button>
        <Menu.Items className="w-56 mt-px text-white bg-primary">
          <Menu.Header className="font-normal">
            <div className="font-medium">
              {userInfo.firstName + " " + userInfo.lastName}
            </div>
            <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
              {userInfo.email}
            </div>
          </Menu.Header>
          <Menu.Divider className="bg-white/[0.08]" />
          <Menu.Item className="hover:bg-white/5" onClick={handleProfile}>
            <Lucide icon="User" className="w-4 h-4 mr-2" />
            {t("profile.profile")}
          </Menu.Item>
          <Menu.Item
            className="hover:bg-white/5"
            onClick={handleChangePassword}
          >
            <Lucide icon="Lock" className="w-4 h-4 mr-2" />
            {t("profile.changePassword")}
          </Menu.Item>
          <Menu.Divider className="bg-white/[0.08]" />
          <Menu.Item className="hover:bg-white/5" onClick={handleLogout}>
            {t("global.logout")}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default Main;
