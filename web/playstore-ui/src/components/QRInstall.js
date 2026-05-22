import { QRCodeCanvas } from "qrcode.react";

function QRInstall({ apkUrl }) {
  const installUrl = new URL(apkUrl, window.location.href).href;

  return (
    <div style={{
      marginTop: 22,
      textAlign: "center",
      overflow: "hidden",
    }}>
      <p style={{ margin: "0 0 12px" }}><b>Scan to install</b></p>

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
