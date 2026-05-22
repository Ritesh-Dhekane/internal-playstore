import { QRCodeCanvas } from "qrcode.react";

function QRInstall({ apkUrl }) {
  const installUrl = new URL(apkUrl, window.location.href).href;

  return (
    <div style={{ marginTop: 20 }}>
      <p><b>Scan to install</b></p>

      <QRCodeCanvas
        value={installUrl}
        size={150}
      />
    </div>
  );
}

export default QRInstall;
