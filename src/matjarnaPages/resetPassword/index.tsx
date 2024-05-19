import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormInput } from "../../base-components/Form";
import { useForm } from "react-hook-form";
import Button from "../../base-components/Button";
import { resetPassword } from "./api";
import { showFailToast, showSuccessToast } from "../../common/toasts";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";

const index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken]: any = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location?.search);
    setToken(queryParams.get("token"));
  }, [location.search]);

  const schema = yup.object({
    password: yup
      .string()
      .required(t("global.requiredField"))
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/, t("global.errors.password")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t("global.confirmPasswordMatch"))
      .required(t("global.requiredField")),
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
    const response = await resetPassword(getValues(), token);
    if (response.status < 300) {
      showSuccessToast(t("resetPassword.form.success"));
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
            {t("resetPassword.form.resetPassword")}
          </h2>
          <div className="mt-8 intro-x">
            <FormInput
              {...register("password")}
              id="password"
              type="password"
              name="password"
              className="block px-4 py-3 intro-x min-w-full lg:min-w-[350px]"
              placeholder={t("resetPassword.form.password")}
            />
          </div>
          {errors.password && (
            <div className="mt-4 text-danger">
              <span className="message">
                {typeof errors.password.message === "string" &&
                  errors.password.message}
              </span>
            </div>
          )}
          <div className="mt-8 intro-x">
            <FormInput
              {...register("confirmPassword")}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="block px-4 py-3 intro-x min-w-full lg:min-w-[350px]"
              placeholder={t("resetPassword.form.confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <div className="mt-4 text-danger">
              <span className="message">
                {typeof errors.confirmPassword.message === "string" &&
                  errors.confirmPassword.message}
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
              {t("global.reset")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default index;
