import { getAxios } from "@/components/config/axios-config";
import { login } from "@/components/helpers/authHelper";

export const loginService = async (data: any) => {
  try {
    const response = await getAxios({
      method: "post",
      url: `auth/login`,
      data: data,
    });
    login(response);
    console.log(response); // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    throw error;
  }
};
