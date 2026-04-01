import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApps, fetchCompanyConfig } from "../services/api";
import AppCard from "../components/AppCard";

function CompanyPage() {
  const params = useParams();
  const company = params.company || "demo";
  const [apps, setApps] = useState([]);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const load = async () => {
      const configs = await fetchCompanyConfig();
      const companyConfig = configs[company];

      setConfig(companyConfig);

      const appsData = await fetchApps(company);
      appsData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setApps(appsData);
    };
    console.log("Company param:", company);
    load();
  }, [company]);

  if (!config) return <div>Loading...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>{config.name} Internal Store</h1>

      {apps.map((app, index) => (
        <AppCard key={index} app={app} />
      ))}
    </div>
  );
}

export default CompanyPage;
