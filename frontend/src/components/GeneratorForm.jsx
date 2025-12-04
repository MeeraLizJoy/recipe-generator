import React, { useState } from "react";

function GeneratorForm({ onGenerate }) {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [cookingTime, setCookingTime] = useState(45);
  const [dietaryPrefs, setDietaryPrefs] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [allergies, setAllergies] = useState("");
  const [mealType, setMealType] = useState("");
  const [spiceLevel, setSpiceLevel] = useState("Medium");
  const [equipmentConstraints, setEquipmentConstraints] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [temperature, setTemperature] = useState(0.7);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      ingredients,
      cuisine,
      difficulty,
      cooking_time: cookingTime,
      dietary_prefs: dietaryPrefs || null,
      serving_size: servingSize || null,
      allergies: allergies || null,
      meal_type: mealType || null,
      spice_level: spiceLevel || null,
      equipment_constraints: equipmentConstraints || null,
      skill_level: skillLevel || null,
      temperature,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cuisine (optional)"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <input
        type="number"
        placeholder="Cooking time (min)"
        value={cookingTime}
        onChange={(e) => setCookingTime(Number(e.target.value))}
        min="1"
        required
      />
      <input
        type="text"
        placeholder="Dietary Preferences (e.g., vegan, keto)"
        value={dietaryPrefs}
        onChange={(e) => setDietaryPrefs(e.target.value)}
      />
      <input
        type="number"
        placeholder="Serving Size"
        value={servingSize}
        onChange={(e) => setServingSize(e.target.value)}
        min="1"
      />
      <input
        type="text"
        placeholder="Allergies (comma separated)"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
      />
      <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
        <option value="">Meal Type (optional)</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <select value={spiceLevel} onChange={(e) => setSpiceLevel(e.target.value)}>
        <option value="Mild">Mild</option>
        <option value="Medium">Medium</option>
        <option value="Spicy">Spicy</option>
      </select>
      <input
        type="text"
        placeholder="Equipment Constraints (e.g., no oven)"
        value={equipmentConstraints}
        onChange={(e) => setEquipmentConstraints(e.target.value)}
      />
      <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
        <option value="">Skill Level (optional)</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <div className="slider-container">
        <input
            type="range"
            id="temperature"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{ "--pos": `${temperature * 100}%` }}
        />
        <div className="slider-value" style={{ left: `calc(${temperature * 100}% - 15px)` }}>
            {temperature.toFixed(1)}
        </div>
      </div>

      <button type="submit">Generate Recipe</button>
    </form>
  );
}

export default GeneratorForm;
