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
      try {
        console.log("Loading company:", company);

        const configs = await fetchCompanyConfig();
        const companyConfig = configs?.[company];

        if (!companyConfig) {
          console.error("Company config not found:", company);
          setConfig(null);
          return;
        }

        setConfig(companyConfig);

        const appsData = await fetchApps(company);

        console.log("📦 Raw apps data:", appsData);

        // SAFETY CHECK
        if (!Array.isArray(appsData)) {
          console.error("appsData is not an array:", appsData);
          setApps([]);
          return;
        }

        // SORT SAFE
        const sortedApps = [...appsData].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        setApps(sortedApps);
      } catch (err) {
        console.error("Error loading apps:", err);
        setApps([]);
      }
    };
    console.log("Company param:", company);
    load();
  }, [company]);

  if (!config) return <div>Loading...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>{config.name} Internal App Store</h1>

      {Array.isArray(apps) && apps.length > 0 ? (
        apps.map((app, index) => <AppCard key={index} app={app} />)
      ) : (
        <p>No apps available</p>
      )}
    </div>
  );
}

export default CompanyPage;
