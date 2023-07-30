import { getAxios } from "@/components/config/axios-config";

export const privateKeyService = async (data: any) => {
  try {
    const response = await getAxios({
      method: "post",
      url: `auth/export-private-key`,
      data: data,
    });
    // console.log(response); // Handle the response data
    return response;
  } catch (error) {
    console.error(error); // Handle any errors
    throw error;
  }
};
