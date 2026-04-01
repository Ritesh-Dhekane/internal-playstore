import axios from "axios";

export const fetchApps = async (company) => {
  const res = await axios.get(`/metadata/${company}/apps.json`);
  return res.data;
};

export const fetchCompanyConfig = async () => {
  const res = await axios.get(`/metadata/company-config.json`);
  return res.data;
};