import { getAxios } from "@/components/config/axios-config";

export const tokenBalanceService = async (data: any) => {
  try {
    const response = await getAxios({
      method: "get",
      url: `user/token-balance`,
      data: data,
    });
    // console.log(response); // Handle the response data
    return response;
  } catch (error) {
    console.error(error); // Handle any errors
    throw error;
  }
};
