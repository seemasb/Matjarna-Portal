import commInstance from "../../communicator/comm";

export const resetPassword = async (passwords: any, token:any) => {
  try {
    const response = await commInstance.post("/resetPassword", {...passwords, token});
    return response;
  } catch (error: any) {
    return error;
  }
};
