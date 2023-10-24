export const tel = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 11;
  let value = event.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) 9 $3-$4");
  event.currentTarget.value = value;

  return value;
};
