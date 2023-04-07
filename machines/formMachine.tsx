import { createActorContext } from "@xstate/react";
import { assign, createMachine } from "xstate";

interface Context {
  form: { firstName: string; lastName: string };
}

export const formMachine = createMachine(
  {
    id: "formMachine",
    context: { form: { firstName: "", lastName: "" } },
    schema: {
      context: {} as Context,
      events: {} as
        | {
            type: "SET_FORM_INPUT_VALUE";
            key: keyof Context["form"];
            value: string;
          }
        | { type: "SUBMIT_FORM" },
    },
    tsTypes: {} as import("./formMachine.typegen").Typegen0,
    initial: `editing`,
    states: {
      editing: {
        on: {
          SET_FORM_INPUT_VALUE: { actions: ["setFormInputValue"] },
          SUBMIT_FORM: { target: "submitting" },
        },
      },
      submitting: {
        invoke: {
          src: "submitForm",
          onDone: { actions: ["clearFields"], target: "editing" },
        },
      },
    },
  },
  {
    actions: {
      setFormInputValue: assign((context, event) => {
        return {
          ...context,
          form: {
            ...context.form,
            [event.key]: event.value,
          },
        };
      }),
      clearFields: assign((context, event) => {
        return { form: { firstName: "", lastName: "" } };
      }),
    },
    services: {
      async submitForm(context, event) {
        // Imagine something asynchronous here
        alert(
          `First name: ${context.form.firstName} Last name: ${context.form.lastName}`
        );
      },
    },
  }
);

export const FormMachineReactContext = createActorContext(formMachine);
