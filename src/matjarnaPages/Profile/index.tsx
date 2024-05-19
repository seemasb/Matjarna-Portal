import { useEffect, useState } from "react";
import Button from "../../base-components/Button";
import { FormInput, FormLabel } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  ACCEPTED_IMAGE_FORMATS,
  UPLOADED_FILE_SIZE,
  BASE_URL,
} from "../../common/constants";
import { updateNames, updateProfilePicture } from "./api";
import LoadingIcon from "../../base-components/LoadingIcon";
import { setUser } from "../../stores/userSlice";
import { showSuccessToast, showFailToast } from "../../common/toasts";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

function Main() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSubmittingImage, setIsSubmittingImage] = useState<boolean>();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const fullUrl = userInfo.profilePicture
    ? BASE_URL + userInfo.profilePicture
    : `https://ui-avatars.com/api/?background=random&length=1&name=${userInfo.firstName}`;

  const schema = yup.object({
    firstName: yup.string().required(t("global.requiredField")),
    lastName: yup.string(),
  });

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(initialValues);
  }, []);

  const initialValues = {
    email: userInfo.email,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
  };

  const handleRemoveImage = async () => {
    setIsSubmittingImage(true);
    const response = await updateProfilePicture(undefined);
    handleUpdateResponse(response);
    setIsSubmittingImage(false);
  };

  const handleFileChange = async (event: any) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      if (!ACCEPTED_IMAGE_FORMATS.includes(file?.type)) {
        showFailToast(t("global.typeError"));
        return;
      }
      if (file.size >= UPLOADED_FILE_SIZE) {
        showFailToast(t("global.typeError"));
        return;
      }

      setIsSubmittingImage(true);
      const response = await updateProfilePicture(file);
      handleUpdateResponse(response);
      setIsSubmittingImage(false);
      fileInput.value = "";
    }
  };

  const onSubmit = async (event: any) => {
    if (!isEmpty(dirtyFields)) {
      const response: any = await updateNames(getValues());
      handleUpdateResponse(response);
      reset(response.data);
    }
  };

  const handleUpdateResponse = (response: any) => {
    if (response?.status < 300) {
      dispatch(setUser(response.data));
      showSuccessToast(t("profile.notifications.updateSucceeded"));
    } else {
      showFailToast(t("profile.notifications.updateFailed"));
    }
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">
          {t("profile.updateProfile")}
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
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
              <Link
                className="flex items-center font-medium text-primary"
                to="/profile"
              >
                <Lucide icon="Activity" className="w-4 h-4 mr-2" />
                {t("profile.personalInformation")}
              </Link>
              <Link className="flex items-center mt-5" to="/changePassword">
                <Lucide icon="Lock" className="w-4 h-4 mr-2" />
                {t("profile.changePassword")}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          <div className="intro-y box lg:mt-5">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="mr-auto text-base font-medium">
                {t("profile.personalInformation")}
              </h2>
            </div>
            <div className="p-5">
              <div className="flex flex-col xl:flex-row">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <div className="flex-1 mt-6 xl:mt-0">
                    <div className="grid grid-cols-12 gap-x-5">
                      <div className="col-span-12 2xl:col-span-6">
                        <div>
                          <FormLabel htmlFor="firstName">
                            {t("profile.firstName")}
                          </FormLabel>
                          <FormInput
                            {...register("firstName")}
                            id="firstName"
                            type="text"
                            placeholder={t("profile.firstName")}
                          />
                          {errors.firstName && (
                            <div className="mt-2 text-danger">
                              {typeof errors.firstName.message === "string" &&
                                errors.firstName.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-span-12 2xl:col-span-6">
                        <div className="mt-3 2xl:mt-0">
                          <FormLabel htmlFor="lastName">
                            {t("profile.lastName")}
                          </FormLabel>
                          <FormInput
                            {...register("lastName")}
                            id="lastName"
                            type="text"
                            placeholder={t("profile.lastName")}
                          />
                        </div>
                      </div>
                      <div className="col-span-12">
                        <div className="mt-3">
                          <FormLabel htmlFor="email">
                            {t("profile.email")}
                          </FormLabel>
                          <FormInput
                            {...register("email")}
                            id="email"
                            type="text"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-20 mt-16"
                      disabled={isSubmitting}
                    >
                      {t("global.save")}
                      {isSubmitting && (
                        <LoadingIcon
                          icon="spinning-circles"
                          color="white"
                          className="w-4 h-4 ml-2"
                        />
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mx-auto w-52 xl:mr-0 xl:ml-6">
                  <div className="p-5 border-2 border-dashed rounded-md shadow-sm">
                    <div className="relative h-40 mx-auto cursor-pointer image-fit zoom-in">
                      <img
                        className="rounded-md"
                        src={
                          userInfo.profilePicture
                            ? BASE_URL + userInfo.profilePicture
                            : fullUrl
                        }
                        alt="Profile Picture"
                      />
                      {userInfo.profilePicture && (
                        <Tippy
                          as="div"
                          content={t("global.removeImageTippy")}
                          className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full bg-danger"
                        >
                          <Lucide
                            icon="X"
                            className="w-4 h-4"
                            onClick={handleRemoveImage}
                          />
                        </Tippy>
                      )}
                    </div>
                    <div className="relative mx-auto mt-5 cursor-pointer">
                      <Button
                        variant="primary"
                        type="button"
                        className="w-full"
                        disabled={isSubmittingImage}
                      >
                        {userInfo.profilePicture
                          ? t("profile.changeProfile")
                          : t("profile.uploadProfile")}
                      </Button>
                      <FormInput
                        id="profilePicture"
                        accept="image/*"
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        disabled={isSubmittingImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
