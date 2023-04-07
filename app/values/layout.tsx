"use client";

import { FormMachineReactContext } from "@/machines/formMachine";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <FormMachineReactContext.Provider>
        {children}
      </FormMachineReactContext.Provider>
    </section>
  );
}
