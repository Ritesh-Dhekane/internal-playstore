import { QRCodeCanvas } from "qrcode.react";
import globalStyles from "../styles/globalStyles";

function QRInstall({ apkUrl }) {
  const installUrl = new URL(apkUrl, window.location.href).href;

  return (
    <div style={globalStyles.qrContainer}>
      <p style={globalStyles.qrLabel}>Scan to install</p>

      <QRCodeCanvas
        value={installUrl}
        size={150}
        style={{
          width: "min(150px, 100%)",
          height: "auto",
        }}
      />
    </div>
  );
}

export default QRInstall;
