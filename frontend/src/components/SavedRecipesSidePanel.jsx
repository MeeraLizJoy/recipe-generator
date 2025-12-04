import React from "react";
import { FaRegBookmark } from "react-icons/fa"; // Use any logo/icon of your choice

function SavedRecipesSidePanel({
  savedRecipes,
  onSelect,
  user,
  panelOpen,
  setPanelOpen,
}) {
  return (
    <>
      {/* Logo trigger area */}
      <div
        style={{
          position: "fixed",
          top: "40%",
          right: 0,
          width: "44px",
          height: "44px",
          background: "#fff8f0",
          borderTopLeftRadius: "12px",
          borderBottomLeftRadius: "12px",
          borderLeft: "1px solid #ccc",
          boxShadow: panelOpen ? "0 2px 10px rgba(0,0,0,0.095)" : undefined,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
          cursor: "pointer",
          transition: "background 0.2s"
        }}
        onMouseEnter={() => setPanelOpen(true)}
        onClick={() => setPanelOpen(true)}
        title="Show saved recipes"
      >
        <FaRegBookmark size="1.5em" color="#007bff" />
      </div>
      {/* Side panel itself */}
      <div
        className="side-panel"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: panelOpen ? 320 : 0,
          height: "100vh",
          backgroundColor: "#fff8f0",
          borderLeft: "1px solid #ccc",
          overflowY: "auto",
          transition: "width 0.3s cubic-bezier(.17,.67,.83,.67)",
          zIndex: 1999,
          boxShadow: panelOpen ? "0 2px 18px rgba(0,0,0,0.09)" : undefined,
        }}
        onMouseLeave={() => setPanelOpen(false)}
      >
        {panelOpen && (
          <div style={{ padding: "1.2rem" }}>
            <h3 style={{ marginTop: 0, fontSize: "1.15rem" }}>Saved Recipes</h3>
            {user && user.uid !== "guest" ? (
              savedRecipes.length > 0 ? (
                savedRecipes.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => onSelect(r.recipe)}
                    style={{
                      marginBottom: "1rem",
                      padding: "0.7rem",
                      borderRadius: "6px",
                      backgroundColor: "#fff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      wordBreak: "break-word",
                      fontSize: "0.97rem"
                    }}
                    title={r.recipe}
                  >
                    <strong>{new Date(r.savedAt).toLocaleDateString()}</strong>
                    <p style={{ marginTop: "0.25rem" }}>
                      {r.recipe.length > 64 ? r.recipe.slice(0, 64) + "..." : r.recipe}
                    </p>
                  </div>
                ))
              ) : (
                <p>No saved recipes</p>
              )
            ) : (
              <p style={{ color: "#99592b", fontSize: "0.97em" }}>Log in to save recipes</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default SavedRecipesSidePanel;
