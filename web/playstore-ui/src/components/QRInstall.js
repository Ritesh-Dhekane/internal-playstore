import { QRCodeCanvas } from "qrcode.react";

function QRInstall({ apkUrl }) {
  return (
    <div style={{ marginTop: 20 }}>
      <p><b>Scan to install</b></p>

      <QRCodeCanvas
        value={window.location.origin + apkUrl}
        size={150}
      />
    </div>
  );
}

export default QRInstall;