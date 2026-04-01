import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApps, fetchCompanyConfig } from "../services/api";
import AppCard from "../components/AppCard";
import PasswordGate from "../components/PasswordGate";

function CompanyPage() {
  const params = useParams();
  const company = params.company || "demo";

  const [apps, setApps] = useState([]);
  const [config, setConfig] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        console.log("🔍 [CompanyPage] Loading company:", company);

        const configs = await fetchCompanyConfig();
        const companyConfig = configs?.[company];

        if (!companyConfig) {
          console.error("❌ [CompanyPage] Company config not found:", company);
          setConfig(null);
          return;
        }

        setConfig(companyConfig);

        // AUTH CHECK
        if (!companyConfig.public) {
          const saved = localStorage.getItem(company);
          if (saved === "true") {
            console.log("🔓 [Auth] Already authorized:", company);
            setIsAuthorized(true);
          } else {
            console.log("🔒 [Auth] Not authorized:", company);
          }
        } else {
          setIsAuthorized(true); // public access
        }

        const appsData = await fetchApps(company);

        console.log("[CompanyPage] Raw apps data:", appsData);

        // SAFETY CHECK
        if (!Array.isArray(appsData)) {
          console.error("[CompanyPage] appsData is not an array:", appsData);
          setApps([]);
          return;
        }

        // SORT SAFE (latest first)
        const sortedApps = [...appsData].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        setApps(sortedApps);
      } catch (err) {
        console.error("🔥 [CompanyPage] Error loading apps:", err);
        setApps([]);
      }
    };

    console.log("[CompanyPage] Route param:", company);
    load();
  }, [company]);

  //  Loading state
  if (!config) return <div>Loading...</div>;

  // Password gate
  if (!config.public && !isAuthorized) {
    return (
      <PasswordGate
        correctPassword={config.password}
        companyName={config.name}
        onSuccess={() => {
          localStorage.setItem(company, "true");
          setIsAuthorized(true);
        }}
      />
    );
  }

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
