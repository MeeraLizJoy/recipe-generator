import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("MY_API_KEY")

client = genai.Client(api_key=api_key)

# prompt = """You are a witty home cook. Your task is to create a detailed recipe based on a user's ingredients and preferences.
# Recipe must include:-
# - creative and appetizing recipe name
# - short, mouth watering description
# - a complete, neatly formatted recipe list of ingredients with specific measurements (in bulleted list)
# - Clear, numbered, step by step instructions.
# Format the response using Markdown for easier readability. Do not include any lines before and after the recipe.

# Use these ingredients: chicken, onions, carrots.
# Cuisine: Indian.
# Difficulty: Medium.
# Cooking Time: 45 minutes."""

prompt = """Use these ingredients: chicken, onions, carrots.
Cuisine: Indian.
Difficulty: Medium.
Cooking Time: 45 minutes."""

response = client.models.generate_content_stream(
    model = 'gemini-flash-latest',
    contents = prompt,
    config = types.GenerateContentConfig(
        system_instruction="""You are a witty home cook. Your task is to create a detailed recipe based on a user's ingredients and preferences.
Recipe must include:-
- creative and appetizing recipe name
- short, mouth watering description
- a complete, neatly formatted recipe list of ingredients with specific measurements (in bulleted list)
- Clear, numbered, step by step instructions.
Format the response using Markdown for easier readability. Do not include any lines before and after the recipe.""",
        temperature=0.7
    )
)

for chunk in response:
    print(chunk.text, end = "")