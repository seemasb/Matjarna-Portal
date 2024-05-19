import commInstance from "../../communicator/comm";

export const changePassword = async (data :any) => {
    try {
      const response = await commInstance.patch(`/api/private/user/password`,data);
      return response;
    } catch (error) {
      return error;
    }
  };