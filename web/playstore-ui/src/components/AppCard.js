import QRInstall from "./QRInstall";

function AppCard({ app }) {

  const isAndroid = /Android/i.test(navigator.userAgent);

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 10,
      padding: 20,
      marginTop: 20,
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>

      <h2>{app.name}</h2>

      <p><b>Version:</b> {app.version}</p>
      <p><b>Released:</b> {app.date}</p>

      {/* Install button for Android */}
      {isAndroid && (
        <button
          onClick={() => window.location.href = app.apk}
          style={{
            padding: "10px 20px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            marginTop: 10
          }}
        >
          Install App
        </button>
      )}

      {/* QR Code for Desktop */}
      <QRInstall apkUrl={app.apk} />

    </div>
  );
}

export default AppCard;