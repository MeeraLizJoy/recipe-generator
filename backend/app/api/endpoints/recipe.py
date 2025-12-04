from fastapi import APIRouter
from app.models.recipe_model import RecipeRequest
from app.services.genai_service import generate_recipe


router = APIRouter()

@router.post('/generate-recipe')
async def generate_recipe_endpoint(request: RecipeRequest):
    """
    Endpoint to generate a recipe using Gemini API.
    Accepts RecipeRequenst model from forntend,
    calls service, returns recipe as JSON.
    """
    
    # Unpacking request data and call the service
    recipe = generate_recipe(
        ingredients=request.ingredients,
        dietary_prefs=request.dietary_prefs,
        cuisine=request.cuisine,
        cooking_time=request.cooking_time,
        difficulty=request.difficulty,
        serving_size=request.serving_size,
        allergies=request.allergies,
        meal_type=request.meal_type,
        spice_level=request.spice_level,
        equipment_constraints=request.equipment_constraints,
        skill_level=request.skill_level,
        output_format=request.output_format,
        tone=request.tone,
        temperature=request.temperature
    )

    # Return the recipe in JSON format
    return {"recipe": recipe}