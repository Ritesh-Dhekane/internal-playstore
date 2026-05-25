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
    ...(isAndroid ? {
      position: "sticky",
      bottom: 12,
      zIndex: 1,
      boxShadow: "0 6px 18px rgba(46,125,50,0.28)",
    } : {}),
  };

  return (
    <div style={globalStyles.card}>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        {app.icon ? (
          <img
            src={resolvePublicAsset(app.icon)}
            alt={`${app.name} icon`}
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              objectFit: "cover",
              border: `1px solid ${colors.border}`,
              background: colors.surfaceSoft,
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: colors.surfaceSoft,
              border: `1px solid ${colors.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.muted,
              fontSize: 22,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {app.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <h2 style={{ margin: 0 }}>{app.name}</h2>

            {isLatest && (
              <span style={{
                ...globalStyles.badge,
                background: colors.successSoft,
                color: colors.success,
              }}>
                Latest
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 12 }}>
            <span style={{
              ...globalStyles.badge,
              background: colors.primarySoft,
              color: colors.primary,
            }}>
              Version {app.version}
            </span>

            <span style={globalStyles.metadataText}>
              Released: {app.date}
            </span>

            {app.size && (
              <span style={globalStyles.metadataText}>
                Size: {app.size}
              </span>
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
