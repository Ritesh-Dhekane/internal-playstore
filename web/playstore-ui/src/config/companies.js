export const getCompanyFromURL = () => {
  const path = window.location.pathname.split("/")[1];
  return path || "demo";
};