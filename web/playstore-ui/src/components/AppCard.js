import QRInstall from "./QRInstall";

const colors = {
  border: "#e0e0e0",
  text: "#202124",
  muted: "#5f6368",
  surface: "#ffffff",
  softSurface: "#f8fafd",
  primary: "#1a73e8",
  success: "#2e7d32",
};

const globalStyles = {
  badge: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1,
    padding: "6px 10px",
  },
  button: {
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 700,
    padding: "10px 16px",
  },
};

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
    <div style={{
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      padding: 22,
      marginTop: 20,
      boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      color: colors.text,
    }}>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
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
              background: colors.softSurface,
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
              background: colors.softSurface,
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
                background: "#e6f4ea",
                color: colors.success,
              }}>
                Latest
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginTop: 12 }}>
            <span style={{
              ...globalStyles.badge,
              background: "#e8f0fe",
              color: colors.primary,
            }}>
              Version {app.version}
            </span>

            <span style={{ color: colors.muted, fontSize: 14 }}>
              Released: {app.date}
            </span>

            {app.size && (
              <span style={{ color: colors.muted, fontSize: 14 }}>
                Size: {app.size}
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
        <button
          onClick={() => window.location.href = apkUrl}
          style={{
            ...globalStyles.button,
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
            style={installButtonStyle}
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
