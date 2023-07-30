import { getAxios } from "@/components/config/axios-config";

export const signupService = async (data: any) => {
  try {
    const response = await getAxios({
      method: "post",
      url: `auth/signup`,
      data: data,
    });
    console.log(response); // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    throw error;
  }
};
