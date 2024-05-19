import _ from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import { FormInput, FormLabel } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePassword } from "./api";
import { showFailToast, showSuccessToast } from "../../common/toasts";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../common/constants";
import { Link } from "react-router-dom";

function Main() {
  const { t } = useTranslation();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const fullUrl = userInfo.profilePicture
    ? BASE_URL + userInfo.profilePicture
    : `https://ui-avatars.com/api/?background=random&length=1&name=${userInfo.firstName}`;

  const schema = yup.object().shape({
    oldPassword: yup.string().required(t("global.requiredField")),
    newPassword: yup
      .string()
      .required(t("global.requiredField"))
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/, t("global.errors.password")),
    confirmPassword: yup
      .string()
      .required(t("global.requiredField"))
      .oneOf([yup.ref("newPassword"), null], t("global.confirmPasswordMatch")),
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const response: any = await changePassword(data);
    handleSaveResponse(response);
  };

  const handleSaveResponse = (response: any) => {
    if (response?.status < 300) {
      showSuccessToast(t("profile.notifications.success"));
      reset(initialValues);
    } else {
      showFailToast(t("profile.notifications.failure"));
    }
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">
          {t("profile.changePassword")}
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Profile Menu */}
        <div className="flex flex-col-reverse col-span-12 lg:col-span-4 2xl:col-span-3 lg:block">
          <div className="mt-5 intro-y box">
            <div className="relative flex items-center p-5">
              <div className="w-12 h-12 image-fit">
                <img
                  alt="Profile picture"
                  className="rounded-full"
                  src={fullUrl}
                />
              </div>
              <div className="ml-4 mr-auto">
                <div className="text-base font-medium">
                  {userInfo.firstName + " " + userInfo.lastName}
                </div>
                <div className="text-slate-500">{userInfo.email}</div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <Link className="flex items-center" to="/profile">
                <Lucide icon="Activity" className="w-4 h-4 mr-2 " />
                {t("profile.personalInformation")}
              </Link>
              <Link
                className="flex items-center mt-5 font-medium text-primary"
                to="changePassword"
              >
                <Lucide icon="Lock" className="w-4 h-4 mr-2" />
                {t("profile.changePassword")}
              </Link>
            </div>
          </div>
        </div>
        {/* END: Profile Menu */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {/* BEGIN: Change Password */}
          <div className="intro-y box lg:mt-5">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="mr-auto text-base font-medium">
                {t("profile.changePassword")}
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-5">
                <div>
                  <FormLabel htmlFor="change-password-form-1">
                    {t("profile.oldPassword")}
                  </FormLabel>
                  <FormInput
                    id="change-password-form-1"
                    type="password"
                    placeholder={t("profile.oldPassword")}
                    {...register("oldPassword")}
                  />
                  {errors.oldPassword && (
                    <div className="mt-2 text-danger">
                      {typeof errors.oldPassword.message === "string" &&
                        errors.oldPassword.message}
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <FormLabel htmlFor="change-password-form-2">
                    {t("profile.newPassword")}
                  </FormLabel>
                  <FormInput
                    id="change-password-form-2"
                    type="password"
                    placeholder={t("profile.newPassword")}
                    {...register("newPassword")}
                  />
                  {errors.newPassword && (
                    <div className="mt-2 text-danger">
                      {typeof errors.newPassword.message === "string" &&
                        errors.newPassword.message}
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <FormLabel htmlFor="change-password-form-3">
                    {t("profile.confirmPassword")}
                  </FormLabel>
                  <FormInput
                    id="change-password-form-3"
                    type="password"
                    placeholder={t("profile.confirmPassword")}
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <div className="mt-2 text-danger">
                      {typeof errors.confirmPassword.message === "string" &&
                        errors.confirmPassword.message}
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-4"
                  disabled={isSubmitting}
                >
                  {t("global.save")}
                </Button>
              </div>
            </form>
          </div>
          {/* END: Change Password */}
        </div>
      </div>
    </>
  );
}

export default Main;
