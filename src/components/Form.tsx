'use client'

import Field from "./Field";
import Client from "@/core/Client";
import Button from "./Button";
import useFormValidation from "@/hooks/useFormValidation";
import { STATUS } from "@/types/global";
import { Spinner } from "@/components/Icons";
import { useCallback, useContext } from "react";
import { StatusContext } from "@/contexts/Status/StatusContext";
import {
  formatDateToYYYYMMDD,
  parseDateString,
  timestampToDate,
} from "@/utils/formatDate";
import { tel } from "@/utils/masks";
import {
  telFieldValidation,
  birthdatFieldValidation,
  emailFieldValidation,
  nameFieldValidation,
} from "@/utils/validations";

interface IFormProps {
  client: Client;
  saveClient: (cliente: Client) => void;
  status: STATUS;
}
export default function Form({ client, saveClient }: IFormProps) {
  const initialValues = {
    id: client?.id,
    name: client?.name ?? "",
    birthday:
      formatDateToYYYYMMDD(timestampToDate(client?.birthday)) ?? new Date(),
    tel: client?.tel ?? "",
    email: client?.email ?? "",
  };

  const { values, handleChangeValue, handleSubmit, handleValidate, errors } =
    useFormValidation(initialValues);

  const context = useContext(StatusContext);

  const handleSaveAndValidateClient = useCallback(() => {
    context?.startLoading("Salvando cliente...");
    handleValidate(() => {
      const updatedErrors = {
        name: "",
        birthday: "",
        tel: "",
        email: "",
      };

      updatedErrors.name = nameFieldValidation(errors, values.name).name;
      updatedErrors.birthday = birthdatFieldValidation(
        errors,
        values.birthday.toString()
      ).birthday;
      updatedErrors.tel = telFieldValidation(errors, values.tel).tel;
      updatedErrors.email = emailFieldValidation(errors, values.email).email;

      if (Object.values(updatedErrors).every((error) => error === "")) {
        saveClient?.(
          new Client(
            values.name,
            parseDateString(values.birthday.toString()),
            values.tel,
            values.email,
            values.id
          )
        );
      } else {
        context?.stopLoading({
          status: "error",
          message: "Preencha os campos corretamente.",
        });
      }

      return updatedErrors;
    });
  }, [
    context,
    errors,
    handleValidate,
    saveClient,
    values.birthday,
    values.email,
    values.id,
    values.name,
    values.tel,
  ]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, handleSaveAndValidateClient)}>
        {values.id && (
          <Field
            text="Código"
            value={values.id}
            type="text"
            readOnly={true}
            name="id"
            id="fieldId"
            errors={errors}
            className="mb-4"
          />
        )}
        <Field
          text="Nome"
          type="text"
          value={values.name}
          onChange={handleChangeValue}
          name="name"
          id="nameField"
          errors={errors}
          validation={nameFieldValidation}
          placeholder="Digite o nome do cliente"
          className="mb-4"
        />
        <Field
          text="Data de nascimento"
          type="date"
          defaultValue={values.birthday}
          onChange={handleChangeValue}
          name="birthday"
          id="birthdayField"
          errors={errors}
          validation={birthdatFieldValidation}
          className="mb-4"
        />
        <Field
          text="Telefone"
          type="tel"
          onChange={handleChangeValue}
          name="tel"
          id="telField"
          errors={errors}
          value={values.tel}
          validation={telFieldValidation}
          placeholder="Insira o telefone do cliente"
          inputMask={tel}
          className="mb-4"
        />
        <Field
          text="Email"
          type="email"
          value={values.email}
          onChange={handleChangeValue}
          name="email"
          id="emailField"
          errors={errors}
          validation={emailFieldValidation}
          placeholder="Insira o email do cliente"
          className="mb-4"
        />
        <div className="flex justify-end mt-7">
          <Button
            type="submit"
            color={context?.state.status === "loading" ? "gray" : "hippieGreen"}
            className="w-full"
            disabled={context?.state.status === "loading"}
          >
            {context?.state.status === "loading" ? (
              <Spinner
                color="fill-hippieGreen-700"
                width="w-5"
                height="w-5"
                className="mx-5"
              />
            ) : values.id ? (
              "ALTERAR"
            ) : (
              "SALVAR"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
