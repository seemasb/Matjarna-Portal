import commInstance from "../../communicator/comm";
import { uploadImage } from "../../common/api";

const updateImage = async (imageUrl: any): Promise<any> => {
  try {
    const response = await commInstance.patch(`/api/private/user/image`, null, {
      params: {
        imageUrl: imageUrl,
      },
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const updateNames = async (names: any): Promise<any> => {
  try {
    const response = await commInstance.patch(`/api/private/user/names`, null, {
      params: {
        firstName: names.firstName,
        lastName: names.lastName,
      },
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const updateProfilePicture = async (
  profilePicture: any
): Promise<any> => {
  let response: any;
  // Only if image changed
  if (profilePicture) {
    const imageUrl = await uploadImage(profilePicture);
    response = await updateImage(imageUrl);
  } else {
    response = await updateImage(null);
  }
  return response;
};
