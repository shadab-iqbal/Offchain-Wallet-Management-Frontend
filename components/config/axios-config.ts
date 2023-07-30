import axios from "axios";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import { bearerToken, logout } from "../helpers/authHelper";
import { iAxios } from "../interfaces/axios.interface";
import config from "./app-config";

export const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  // withCredentials: true,
  // crossDomain: true
});

export const getAxios = <T extends z.ZodTypeAny, B extends z.ZodTypeAny>(
  info: iAxios<any | FormData, z.infer<B>>,
  responseSchema: T | null = null,
  bodySchema: B | null = null
): Promise<z.infer<T>> => {
  return new Promise((resolve, reject) => {
    const { url, params = {}, data = {}, method = "get" } = info;
    // const withCredentials = true;

    let dataType = "application/json";

    if (data instanceof FormData) {
      dataType = "FormData";
    }

    const headers = {
      Authorization: "Bearer " + bearerToken(),
      "Content-Type":
        dataType === "FormData" ? "multipart/form-data" : "application/json;charset=UTF-8",
    };

    axiosInstance
      .request({
        method,
        url,
        data: dataType !== "FormData" && !!bodySchema ? bodySchema.parse(data) : data,
        headers,
        params,
      })
      .then((response) => {
        resolve(!!responseSchema ? responseSchema.parse(response.data) : response.data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          logout();
        }
        if (!!responseSchema && error instanceof ZodError) reject(fromZodError(error).message);
        else reject(error);
      });
  });
};

export const API_SERVICE = axios.create({ baseURL: config.API_BASE_URL });
