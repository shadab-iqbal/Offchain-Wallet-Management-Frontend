import { getAxios } from "@/components/config/axios-config";

export const withdrawService = async (data: any) => {
  try {
    const response = await getAxios({
      method: "post",
      url: `trade/withdraw`,
      data: data,
    });
    console.log(response); // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    throw error;
  }
};
