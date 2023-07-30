import { getAxios } from "@/components/config/axios-config";

export const transactionsService = async () => {
  try {
    const response = await getAxios({
      method: "get",
      url: "transactions/",
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
