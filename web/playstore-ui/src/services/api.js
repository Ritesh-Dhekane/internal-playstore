import axios from "axios";

const publicUrl = process.env.PUBLIC_URL || "";

export const fetchApps = async (company) => {
  const res = await axios.get(`${publicUrl}/metadata/${company}/apps.json`);
  return res.data;
};

export const fetchCompanyConfig = async () => {
  const res = await axios.get(`${publicUrl}/metadata/company-config.json`);
  return res.data;
};
