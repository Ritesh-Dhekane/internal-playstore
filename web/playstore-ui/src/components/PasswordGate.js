import { useState } from "react";

function PasswordGate({ correctPassword, onSuccess, companyName }) {

  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (input === correctPassword) {
      onSuccess();
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 100
    }}>

      <h2>{companyName} - Secure Access</h2>

      <p style={{ color: "#666", marginTop: 5 }}>
        Enter password to continue
      </p>

      <input
        type="password"
        placeholder="Enter password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: 10,
          marginTop: 15,
          borderRadius: 5,
          border: "1px solid #ccc",
          width: 250
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 15,
          padding: "10px 20px",
          background: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          width: 120
        }}
      >
        Unlock
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}

    </div>
  );
}

export default PasswordGate;