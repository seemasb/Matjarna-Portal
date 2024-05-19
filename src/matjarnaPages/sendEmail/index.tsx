import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormInput } from "../../base-components/Form";
import { useForm } from "react-hook-form";
import Button from "../../base-components/Button";
import { sendCode } from "./api";
import { showFailToast, showSuccessToast } from "../../common/toasts";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required(),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    const response = await sendCode(getValues());
    if (response.status < 300) {
      showSuccessToast(t("forgotPassword.form.emailSent"));
      navigate("/");
    } else {
      showFailToast(t("global.somethingWentWrong"));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-screen py-5">
        <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md dark:bg-darkmode-600 sm:px-8 sm:w-3/4 md:w-3/5 lg:w-auto">
          <h2 className="text-2xl font-bold text-center intro-x lg:text-3xl lg:text-left">
            {t("forgotPassword.form.forgotPassword")}
          </h2>
          <div className="mt-8 intro-x">
            <FormInput
              {...register("email")}
              id="email"
              type="text"
              name="email"
              className="block px-4 py-3 intro-x min-w-full lg:min-w-[350px]"
              placeholder={t("forgotPassword.form.email")}
            />
          </div>
          {errors.email && (
            <div className="mt-4 text-danger">
              <span className="message">
                {typeof errors.email.message === "string" &&
                  errors.email.message}
              </span>
            </div>
          )}
          <div className="mt-5 text-center intro-x lg:mt-8 lg:text-left">
            <Button
              variant="primary"
              className="w-full px-4 py-3 align-top lg:w-32 lg:mr-3"
              type="submit"
              disabled={isSubmitting}
            >
              {t("global.send")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default index;
