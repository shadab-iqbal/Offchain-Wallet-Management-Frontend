import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";

import { privateKeyService } from "@/resource/services/privateKey.service";

const modalStyles = {
  content: {
    width: "400px", // Set the desired width
    height: "260px", // Set the desired height
    margin: "auto", // Center the modal horizontally
  },
};

export default function PasswordModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate({ password: data.password });
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => await privateKeyService(data),
    // onMutate: (variables) => {
    //   setIsLoading(true);
    // },
    onError: (error, variables, context) => {
      console.log(error);
      toast.error("Invalid Password");
    },
    onSuccess: async (data) => {
      toast.success("Private Key exported!");
      // console.log(data);
      setPrivateKey(data);
    },
  });

  return (
    <>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyles}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Please enter your password again!
          </label>
          <input
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters long.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password.message}</p>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-0 mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="mt-4 break-words text-red-700">Your private key is: {privateKey}</div>
      </Modal>

      <button
        className="absolute top-0 left-0 mt-3 ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          openModal();
        }}
      >
        Export Private Key
      </button>
    </>
  );
}
