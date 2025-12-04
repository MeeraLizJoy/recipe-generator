import React, { useState, useEffect } from "react";
import GeneratorForm from "./components/GeneratorForm";
import LoadingSpinner from "./components/LoadingSpinner";
import RecipeDisplay from "./components/RecipeDisplay";
import LandingPage from "./components/LandingPage";
import SavedRecipesSidePanel from "./components/SavedRecipesSidePanel";
import { generateRecipe } from "./api/recipe-Api";
import "./App.css";

// Firebase imports
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Database helpers
import { saveRecipeForUser, getSavedRecipesForUser } from "./utils/databaseHelpers";

// Notification component
function Notification({ message, type = "info", onClose }) {
  if (!message) return null;
  const style = {
    padding: "0.75rem 1rem",
    margin: "1rem 0",
    borderRadius: "6px",
    color: type === "error" ? "#b00020" : "#0a662a",
    backgroundColor: type === "error" ? "#fbe9e7" : "#e6f4ea",
    border: `1px solid ${type === "error" ? "#b00020" : "#0a662a"}`,
    position: "relative",
  };
  return (
    <div style={style}>
      {message}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          right: 10,
          top: 5,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedSavedRecipe, setSelectedSavedRecipe] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState("login"); // 'login' or 'signup'

  const notify = (message, type = "info") => {
    setNotification({ message, type });
  };

  const clearNotification = () => {
    setNotification({ message: "", type: "info" });
  };

  useEffect(() => {
    if (!user || user.uid === "guest") {
      setSavedRecipes([]);
      setSelectedSavedRecipe(null);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const recipes = await getSavedRecipesForUser(currentUser);
          setSavedRecipes(recipes);
        } catch (err) {
          notify("Failed to load saved recipes.", "error");
        }
      } else {
        setSavedRecipes([]);
        setSelectedSavedRecipe(null);
      }
    });
    return () => unsubscribe();
    // Make sure saved recipes update on login/logout
    // eslint-disable-next-line
  }, [user]);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      notify("Account created & logged in!");
      setUser(auth.currentUser);
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      notify("Logged in successfully!");
      setUser(auth.currentUser);
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setSavedRecipes([]);
    setSelectedSavedRecipe(null);
    notify("Logged out.");
    setEmail("");
    setPassword("");
    setLoginMode("login");
  };

  const handleContinueWithoutLogin = () => {
    setUser({ uid: "guest" });
    setEmail("");
    setPassword("");
    setLoginMode("login");
    notify("Continuing as guest. Log in to save recipes.", "info");
  };

  const handleGenerate = async (params) => {
    setLoading(true);
    setError("");
    setRecipe(null);
    setSaved(false);
    clearNotification();

    try {
      const response = await generateRecipe(params);
      setRecipe(response.recipe);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!user || !recipe) return;
    if (user.uid === "guest") {
      notify("Please login to save recipes.", "error");
      return;
    }
    setSaving(true);
    clearNotification();

    try {
      await saveRecipeForUser(user, recipe);
      setSaved(true);
      const updated = await getSavedRecipesForUser(user);
      setSavedRecipes(updated);
      notify("Recipe saved successfully!");
    } catch (err) {
      notify("Failed to save recipe. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const selectSavedRecipe = (recipe) => {
    setSelectedSavedRecipe(recipe);
    setSaved(false); // reset save button visibility
    setRecipe(recipe);
  };

  // Render landing page if user is not logged in or is guest
  if (!user) {
    return (
      <LandingPage
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loginMode={loginMode}
        setLoginMode={setLoginMode}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onContinueWithoutLogin={handleContinueWithoutLogin}
        notification={notification}
        clearNotification={clearNotification}
      />
    );
  }

  // Render the recipe generator view
  return (
    <div className="app-container" style={{ position: "relative" }}>
      <h1 style={{ marginBottom: "1rem" }}>GenAI Recipe Generator</h1>
      {user && user.uid !== "guest" && (
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: 18,
            right: 28,
            padding: "0.45rem 1.1rem",
            background: "#deb887",
            borderRadius: "7px",
            border: "none",
            color: "#442900",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      )}
      {user && user.uid === "guest" && (
        <div style={{
          position: "absolute",
          top: 22,
          right: 28,
          fontSize: "1rem",
          color: "#82472d"
        }}>
          (Guest Mode)
        </div>
      )}
      <GeneratorForm onGenerate={handleGenerate} />

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={clearNotification}
      />
      {loading && <LoadingSpinner />}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {recipe && (
        <div>
          <RecipeDisplay recipe={recipe} />
          {user && user.uid !== "guest" && !saved && (
            <button
              onClick={handleSaveRecipe}
              disabled={saving}
              style={{ marginTop: "1rem" }}
            >
              {saving ? "Saving..." : "Save Recipe"}
            </button>
          )}
          {saved && <p style={{ color: "green" }}>Recipe saved!</p>}
        </div>
      )}

      <SavedRecipesSidePanel
        savedRecipes={savedRecipes}
        onSelect={selectSavedRecipe}
        user={user}
        panelOpen={panelOpen}
        setPanelOpen={setPanelOpen}
      />
    </div>
  );
}

export default App;
