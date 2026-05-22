import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApps, fetchCompanyConfig } from "../services/api";
import AppCard from "../components/AppCard";
import PasswordGate from "../components/PasswordGate";

const colors = {
  background: "#f8fafd",
  text: "#202124",
  muted: "#5f6368",
};

const globalStyles = {
  page: {
    minHeight: "100vh",
    background: colors.background,
    color: colors.text,
    padding: "clamp(20px, 5vw, 48px)",
    boxSizing: "border-box",
  },
  content: {
    maxWidth: 1120,
    margin: "0 auto",
  },
};

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

        console.log("[CompanyPage] Company config loaded:", {
          company,
          name: companyConfig.name,
          public: companyConfig.public,
        });

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

        console.log("[CompanyPage] Apps loaded:", {
          company,
          count: appsData.length,
        });

        // SORT SAFE (latest first)
        const sortedApps = [...appsData].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        console.log("[CompanyPage] Apps sorted latest first:", {
          company,
          latestApp: sortedApps[0]?.name || null,
        });

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
    <main style={globalStyles.page}>
      <div style={globalStyles.content}>
        <header style={{ marginBottom: "clamp(20px, 4vw, 32px)" }}>
          <h1 style={{
            fontSize: "clamp(28px, 6vw, 42px)",
            lineHeight: 1.1,
            margin: 0,
          }}>
            {config.name} Internal App Store
          </h1>
          <p style={{
            color: colors.muted,
            fontSize: "clamp(15px, 3vw, 17px)",
            lineHeight: 1.5,
            margin: "10px 0 0",
          }}>
            Download approved internal Android apps for your team.
          </p>
        </header>

        <section aria-label="Available apps">
          {Array.isArray(apps) && apps.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "clamp(16px, 3vw, 24px)",
                alignItems: "stretch",
              }}
            >
              {apps.map((app, index) => (
                <AppCard key={index} app={app} isLatest={index === 0} />
              ))}
            </div>
          ) : (
            <p style={{ color: colors.muted, margin: 0 }}>No apps available</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default CompanyPage;
