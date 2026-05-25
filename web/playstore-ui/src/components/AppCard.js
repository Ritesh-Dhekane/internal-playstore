import QRInstall from "./QRInstall";
import colors from "../styles/colors";
import globalStyles from "../styles/globalStyles";

const publicUrl = process.env.PUBLIC_URL || "";

const resolvePublicAsset = (path) => {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${publicUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

function AppCard({ app, isLatest = false }) {

  const isAndroid = /Android/i.test(navigator.userAgent);
  const apkUrl = resolvePublicAsset(app.apk);
  const installButtonStyle = {
    ...globalStyles.button,
    background: colors.success,
    color: "white",
  };

  return (
    <div style={globalStyles.card}>

      <div style={globalStyles.cardHeader}>
        {app.icon ? (
          <img
            src={resolvePublicAsset(app.icon)}
            alt={`${app.name} icon`}
            style={globalStyles.appIcon}
          />
        ) : (
          <div
            aria-hidden="true"
            style={globalStyles.appIconPlaceholder}
          >
            {app.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
        )}

        <div style={globalStyles.appInfo}>
          <div style={globalStyles.appTitleRow}>
            <h2 style={globalStyles.appTitle}>{app.name}</h2>

            {isLatest && (
              <span style={globalStyles.latestBadge}>
                Latest
              </span>
            )}
          </div>

          <div style={globalStyles.metadataBlock}>
            <div style={globalStyles.metadataRow}>
              <span style={globalStyles.versionBadge}>
                Version {app.version}
              </span>
              <span style={globalStyles.metadataText}>
                Released {app.date}
              </span>
            </div>

            {app.size && (
              <div style={globalStyles.metadataText}>
                File size: {app.size}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={globalStyles.buttonGroup}>
        <button
          onClick={() => window.location.href = apkUrl}
          style={{
            ...globalStyles.button,
            ...globalStyles.responsiveButton,
            background: colors.primary,
            color: "white",
          }}
        >
          Download APK
        </button>

        {/* Install button for Android */}
        {isAndroid && (
          <button
            onClick={() => window.location.href = apkUrl}
            style={{
              ...installButtonStyle,
              ...globalStyles.responsiveButton,
            }}
          >
            Install App
          </button>
        )}
      </div>

      {/* QR Code for Desktop */}
      <QRInstall apkUrl={apkUrl} />

    </div>
  );
}

export default AppCard;
