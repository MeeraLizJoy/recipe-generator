import React from "react";

function LandingPage({
  email,
  password,
  setEmail,
  setPassword,
  loginMode,
  setLoginMode,
  onLogin,
  onSignup,
  onContinueWithoutLogin,
  notification,
  clearNotification
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5rem",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: 0 }}>GenAI Recipe Generator</h1>
      <div style={{
        background: "#fff",
        padding: "2rem 2.5rem",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)"
      }}>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: 230 }}
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: "0.7rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: "0.7rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          {loginMode === "login" ? (
            <>
              <button type="button" onClick={onLogin} style={{
                padding: "0.7rem", borderRadius: "6px", background: "#007bff", color: "#fff", border: "none", fontWeight: 600
              }}>Login</button>
              <span style={{ fontSize: "0.9em" }}>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setLoginMode("signup")}
                  style={{
                    background: "none", border: "none", color: "#007bff", cursor: "pointer"
                  }}
                >Sign Up</button>
              </span>
            </>
          ) : (
            <>
              <button type="button" onClick={onSignup} style={{
                padding: "0.7rem", borderRadius: "6px", background: "#007bff", color: "#fff", border: "none", fontWeight: 600
              }}>Sign Up</button>
              <span style={{ fontSize: "0.9em" }}>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setLoginMode("login")}
                  style={{
                    background: "none", border: "none", color: "#007bff", cursor: "pointer"
                  }}
                >Login</button>
              </span>
            </>
          )}
        </form>
        <div style={{ margin: "1.5rem 0 0.7rem", color: "#444" }}>or</div>
        <button
          onClick={onContinueWithoutLogin}
          style={{
            padding: "0.65rem 1.4rem",
            fontSize: "1rem",
            background: "#eee",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Continue as Guest
        </button>
        {notification.message && (
          <div style={{
            marginTop: "0.9rem",
            color: notification.type === "error" ? "#b00020" : "#157e33",
            background: notification.type === "error" ? "#fbe9e7" : "#e6f4ea",
            border: notification.type === "error" ? "1px solid #b00020" : "1px solid #157e33",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            position: "relative",
            fontSize: "0.98em"
          }}>
            {notification.message}
            <button onClick={clearNotification} style={{
              border: "none", background: "transparent", cursor: "pointer", float: "right"
            }}>×</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default LandingPage;
