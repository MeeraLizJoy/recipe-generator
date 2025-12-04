import React from "react";
import ReactMarkdown from "react-markdown";
//import "./RecipeDisplay.css";

function RecipeDisplay({ recipe }) {
  if (!recipe) return null;
  return (
    <div className="recipe-display">
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </div>
  );
}

export default RecipeDisplay;

