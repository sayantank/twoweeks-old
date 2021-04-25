import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";

import ErrorMsg from "./ErrorMsg";
import FormInput from "./FormInput";
import RadioButton from "./RadioButton";

const RecordForm = () => {
  const [disabled, setDisabled] = React.useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (credentials) => {
      return axios.post("/api/record/add", { data: credentials });
    },
    {
      onMutate: () => {
        setDisabled(true);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("records");
        toast.success("Successfully added record.");
        setDisabled(false);
      },
      onError: (e) => {
        toast.error(e.response.data.message);
        setDisabled(false);
      },
    }
  );

  const validateTemp = (temp) => {
    if (isNaN(temp)) return "Invalid Temperature";
    if (Number(temp) < 90 || Number(temp) > 110) {
      return "Invalid Temperature";
    }
    return true;
  };

  const submitRecord = async (credentials) => {
    try {
      credentials.temp = Number(credentials.temp);
      credentials.smell = credentials.smell === "true" ? true : false;
      credentials.taste = credentials.taste === "true" ? true : false;
    } catch (e) {
      return toast.error("Form error. Contact me on Twitter.");
    }

    try {
      mutation.mutate(credentials);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitRecord)}
      className="flex flex-col space-y-4 w-full p-4 rounded-md border-2 border-gray-200"
    >
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6">
        <div className="flex lg:flex-1 flex-col space-y-1">
          <FormInput
            {...register("temp", {
              required: "This field is required.",
              pattern: {
                value: new RegExp("^(\\d{1,3}|\\d{0,3}\\.\\d{1,2})$"),
                message: "Invalid Temperature",
              },
              valid: (temp) => validateTemp(temp),
            })}
            name="temp"
            title="Temperature"
            type="text"
            placeholder="Fahrenheit"
          />
          <ErrorMessage
            errors={errors}
            name="temp"
            render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
          />
        </div>
        <div className="flex lg:flex-1 flex-col space-y-1">
          <FormInput
            {...register("oxygen", {
              required: "This field is required.",
              min: {
                value: 0,
                message: "SpO2 level should be between 0-100",
              },
              max: {
                value: 100,
                message: "SpO2 level should be between 0-100",
              },
              valueAsNumber: true,
            })}
            name="oxygen"
            title="SpO2 Levels (Oxygen)"
            type="number"
            placeholder="Sp02 percentage"
          />
          <ErrorMessage
            errors={errors}
            name="oxygen"
            render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
          />
        </div>
      </div>
      <div className="flex flex-row space-x-8">
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-gray-800 font-medium">
            Sense of <span className="underline font-bold">Smell</span>
          </p>
          <div className="flex items-center space-x-4">
            <RadioButton
              {...register("smell", {
                required: "This field is required",
              })}
              text="Yes"
              name="smell"
              value={true}
            />
            <RadioButton
              {...register("smell", {
                required: "This field is required",
              })}
              text="No"
              name="smell"
              value={false}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="smell"
            render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-gray-800 font-medium">
            Sense of <span className="underline font-bold">Taste</span>
          </p>
          <div className="flex items-center space-x-4">
            <RadioButton
              {...register("taste", {
                required: "This field is required.",
              })}
              text="Yes"
              name="taste"
              value={true}
            />
            <RadioButton
              {...register("taste", {
                required: "This field is required.",
              })}
              text="No"
              name="taste"
              value={false}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="taste"
            render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
          />
        </div>
      </div>
      <button
        disabled={disabled}
        type="submit"
        className={`${
          disabled ? "bg-gray-400" : "bg-green-400 hover:bg-green-500"
        } transition-colors px-4 py-2 rounded-md text-white font-bold focus:outline-none`}
      >
        Add record
      </button>
    </form>
  );
};

export default RecordForm;
