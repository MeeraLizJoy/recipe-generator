import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retreive Gemini API key from environment variables
api_key = os.getenv("MY_API_KEY")

# Initialize the GenAI client with the API key
client = genai.Client(api_key=api_key)

def generate_recipe(
    ingredients,                        # (str) List of ingredients
    dietary_prefs=None,                 # (str) Dietary preferances (e.g., vegan, keto)
    cuisine=None,                       # (str) Cuisine type (e.g., Indian, Italian)
    cooking_time=None,                  # (int/str) Total cooking time in minutes 
    difficulty=None,                    # (str) Recipe difficulty (easy/medium/hard)
    serving_size=None,                  # (int/str) Number of servings
    allergies=None,                     # (str) Allergies to avoid (e.g., nuts, dairy)
    meal_type=None,                     # (str) Type of meal (braekfast, dinner, snacks, etc.)
    spice_level=None,                   # (str) Spice level (mild/medium/spicy)
    equipment_constraints=None,         # (str) Equipment constraints (e.g., no oven, microwave only)
    skill_level=None,                   # (str) User skill level (beginner/intermdiate/advanced)
    output_format="Markdown",           # (str) Response format (Markdown, plain text, etc.)
    tone="witty",                       # (str) Recipe tone/personality (witty, concise)
    temperature=0.7                     # (float) Creativity level of the response (0.0-1.0)
):
    """
    Generates a recipe using the Gemini API with all provided customization parameters.
    Dynamically builds the prompt for Gemini based on specified user input.
    """

    # Building user prompt by including only non-null parameters for modularity
    prompt_parts = [f"Use these ingredients: {ingredients}."]
    if dietary_prefs:
        prompt_parts.append(f"Dietary preferences: {dietary_prefs}.")
    if cuisine:
        prompt_parts.append(f"Cuisine: {cuisine}.")
    if difficulty:
        prompt_parts.append(f"Difficulty: {difficulty}.")
    if cooking_time:
        prompt_parts.append(f"Cooking Time: {cooking_time} minutes.")
    if serving_size:
        prompt_parts.append(f"Serving Size: {serving_size}.")
    if allergies:
        prompt_parts.append(f"Avoid these allergens: {allergies}.")
    if meal_type:
        prompt_parts.append(f"Meal Type: {meal_type}.")
    if spice_level:
        prompt_parts.append(f"Spice Level: {spice_level}.")
    if equipment_constraints:
        prompt_parts.append(f"Equipment Constraints: {equipment_constraints}.")
    if skill_level:
        prompt_parts.append(f"Skill Level: {skill_level}.")

    
    # Joining all prompt pieces into a single instruction block
    user_prompt = "\n".join(prompt_parts)

    # Composing the system instructions for Gemini
    system_instruction = f"""
You are a {tone} home cook. Your task is to create a detailed recipe based on a user's ingredients and preferences.
Recipe must include:
- Creative recipe name
- Short description
- Ingredients listed as a bulleted markdown list, each ingredient on its own line preceded by "- "
- Clear, numbered step-by-step instructions
Format the response using {output_format}. No extra lines before or after the recipe.
Ensure Markdown tables render correctly with each row on a distinct line.
"""

    
    # Calling Gemini API with stream for efficient content retreival and creativity control
    response = client.models.generate_content_stream(
        model='gemini-flash-latest',
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=temperature
        )
    )

    # Collection streaming output chunks into final recipe text
    recipe_output = ""
    for chunk in response:
        recipe_output += chunk.text

    return recipe_output
    