import commInstance from "../../communicator/comm";

export const sendCode = async (email: any) => {
  try {
    const response = await commInstance.post("/forgotPassword", email);
    return response;
  } catch (error: any) {
    return error;
  }
};
