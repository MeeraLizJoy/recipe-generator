from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from app.api.endpoints.recipe import router as recipe_router


# Creating FastAPI app instance
app = FastAPI(
    title="Recipe Generator API",
    description="Backend for Gemini-powered recipe generation",
    version="1.0.0"
)

# Add CORS middleware to allow requests from your frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Adjust this if your frontend runs elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include recipe generator router
app.include_router(recipe_router, prefix="/api", tags=["recipes"])


# root route for status check
@app.get("/")
async def root():
    return {"message": "Recipe Generator API running!"}
