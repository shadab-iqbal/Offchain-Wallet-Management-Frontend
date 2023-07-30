import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import toast from "react-hot-toast";

import { buyService, sellService } from "@/resource/services/trade.service";
import RoutingComponent from "../routing/RoutingComponent";
import HeaderComponent from "../header/HeaderComponent";

export default function TradeComponent() {
  const [componentKey, setComponentKey] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const side = useMemo(
    () =>
      typeof router.query.side === "string" &&
      ["buy", "sell"].includes(router.query.side.toLowerCase())
        ? router.query.side.toLowerCase()
        : "buy",
    [router.query.side]
  );

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate({ amount: data.amount });
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      side == "buy" ? await buyService(data) : await sellService(data);
    },
    onMutate: (variables) => {
      toast.loading("Transacting...", {
        duration: 0, // Set duration to 0 for an indefinite loading toast
      });
    },
    onError: (error, variables, context) => {
      console.log(error);
      toast.dismiss(); // dismiss the loading notification
      toast.error("Transaction Failed!");
      reset();
      setIsLoading(false);
    },
    onSuccess: async (data) => {
      console.log(data);
      toast.dismiss(); // dismiss the loading notification
      toast.success("Transaction Successful");
      reset();
      setComponentKey((prevKey) => prevKey + 1);
      // setIsLoading(false);
      // side == "buy" ? router.push("/trade") : router.push("/trade?side=sell");
    },
  });

  return (
    <div>
      <HeaderComponent key={componentKey} />

      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <Image
          className="absolute top-20"
          src="/DCL_logo_1.png"
          alt="DCL Logo"
          width={300}
          height={0}
        />

        <div className="flex justify-center">
          <RoutingComponent side={side} />
        </div>

        <div className="w-full max-w-md bg-white mt-3 p-10 shadow-xl rounded-lg border border-blue-500">
          {/* <h3 className="text-2xl font-bold mb-4">Enter token amount</h3> */}
          <p className="text-gray-600 mb-8 opacity-90">
            Enter {side == "buy" ? "USD" : "token"} amount
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="mb-7">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                id="amount"
                placeholder={side == "buy" ? "Amount in USD" : "Amount in ETH unit"}
                {...register("amount", {
                  required: "Amount is required",
                })}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mx-auto"
                type="submit"
              >
                {side == "buy" ? "Buy Tokens" : "Sell Tokens"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
