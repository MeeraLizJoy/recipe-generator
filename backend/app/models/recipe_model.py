from pydantic import BaseModel, Field
from typing import Optional

# ... for required information
# Optional for can be omitted details

class RecipeRequest(BaseModel):
    ingredients: str = Field(..., description="List of ingredients available with the user")
    dietary_prefs: Optional[str] = Field(None, description="User's dietary preferences, e.g. vegan, keto")
    cuisine: Optional[str] = Field(None, description="Cuisine type, e.g. Indian, Italian")
    cooking_time: Optional[int] = Field(None, description="Cooking time in minutes")
    difficulty: Optional[str] = Field(None, description="Difficulty level: Easy, Medium, Hard")
    serving_size: Optional[int] = Field(None, description="Number of servings desired")
    allergies: Optional[str] = Field(None, description="Ingredients to avoid, e.g. peanuts, dairy")
    meal_type: Optional[str] = Field(None, description="Meal type: breakfast, lunch, dinner, snack, dessert")
    spice_level: Optional[str] = Field(None, description="Spice level: mild, medium, spicy")
    equipment_constraints: Optional[str] = Field(None, description="Equipment constraints, e.g. microwave only")
    skill_level: Optional[str] = Field(None, description="Cooking skill level: beginner, intermediate, advanced")
    output_format: Optional[str] = Field("Markdown", description="Format for recipe, e.g. Markdown or plain text")
    tone: Optional[str] = Field("witty", description="Recipe tone/personality, e.g. witty, concise, formal")
    temperature: Optional[float] = Field(0.7, ge=0.0, le=1.0, description="Creativity parameter for Gemini model")
