import { getAxios } from "@/components/config/axios-config";

export const buyService = async (data: any) => {
  try {
    const response = await getAxios({
      method: "post",
      url: `trade/buy`,
      data: data,
    });
    console.log(response); // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    throw error;
  }
};

export const sellService = async (data: any) => {
  try {
    const response = await getAxios({
      method: "post",
      url: `trade/sell`,
      data: data,
    });
    console.log(response); // Handle the response data
  } catch (error) {
    console.error(error); // Handle any errors
    throw error;
  }
};
