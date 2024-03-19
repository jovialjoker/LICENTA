export const getURLID = (href: string) => {
  return href.split("/").pop();
};
