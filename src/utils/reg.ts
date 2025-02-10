export const validateEmil = (emil: string) => {
  const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(emil);
};
