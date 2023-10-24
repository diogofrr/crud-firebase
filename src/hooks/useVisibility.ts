import { useState } from "react";
import { FORM, TABLE } from "@/constants/constants";

export default function useVisibility() {
  const [visible, setVisible] = useState<"table" | "form">(TABLE);

  const showTable = () => setVisible(TABLE);
  const showForm = () => setVisible(FORM);

  return {
    formIsVisible: visible === FORM,
    tableIsVisible: visible === TABLE,
    showTable,
    showForm,
  };
}
