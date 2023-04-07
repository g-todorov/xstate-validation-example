"use client";

import { FormMachineReactContext } from "@/machines/formMachine";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
};

export default function ValuesExample() {
  const [state, send] = FormMachineReactContext.useActor();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    values: {
      firstName: state.context.form.firstName,
      lastName: state.context.form.lastName,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        send({ type: "SUBMIT_FORM" });
      })}
    >
      <Controller
        control={control}
        name="firstName"
        rules={{
          required: { value: true, message: "First name is required." },
        }}
        render={({ field: { value } }) => {
          return (
            <input
              placeholder="First name"
              onChange={({ currentTarget: { value } }) => {
                send({
                  type: "SET_FORM_INPUT_VALUE",
                  key: "firstName",
                  value: value,
                });
              }}
              value={value}
            />
          );
        }}
      />
      {errors.firstName && <span>This field is required</span>}

      <Controller
        control={control}
        name="lastName"
        rules={{
          required: { value: true, message: "Las name is required." },
        }}
        render={({ field: { value } }) => {
          return (
            <input
              placeholder="Last name"
              onChange={({ currentTarget: { value } }) => {
                send({
                  type: "SET_FORM_INPUT_VALUE",
                  key: "lastName",
                  value,
                });
              }}
              value={value}
            />
          );
        }}
      />
      {errors.lastName && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
