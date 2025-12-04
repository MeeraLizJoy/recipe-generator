recipe-generator/
├── .env.template
├── README.md
├── requirements.txt      # For Python packages
├── package.json          # For managing the whole project's scripts
├── backend/              # Python with FastAPI or Flask
└── frontend/             # React, Next.js, or simple HTML/CSS/JS



backend/
├── app/
│   ├── __init__.py
│   ├── main.py                   # The main FastAPI application instance
│   ├── api/
│   │   ├── __init__.py
│   │   └── endpoints/
│   │       └── recipe.py         # Defines the /generate-recipe endpoint
│   ├── services/
│   │   └── genai_service.py      # Contains the GenAI API call logic
│   └── models/
│       └── recipe_model.py       # Pydantic models for API request/response
├── .env                          # Holds the actual API keys (ignore in Git)
└── venv/                         # A virtual environment for dependencies



frontend/
├── public/
│   └── index.html              # The main HTML file
├── src/
│   ├── assets/
│   │   └── logo.svg            # Static files like images and icons
│   ├── components/
│   │   ├── GeneratorForm.jsx   # Form for user inputs
│   │   ├── RecipeDisplay.jsx   # Component to display the generated recipe
│   │   └── LoadingSpinner.jsx  # Shows while the recipe is being generated
│   ├── api/
│   │   └── recipeApi.js        # Functions for making API requests to the backend
│   ├── App.jsx                 # The root React component
│   ├── main.jsx                # Renders the App component
│   └── styles.css              # Global styles
├── .env                          # Environment variables for the frontend
└── package.json     





# GenAI Recipe Generator

A full-stack web application to generate personalized recipes using Google Gemini AI, featuring user authentication and saved recipe management via Firebase.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Screenshots](#screenshots)  
- [Future Improvements](#future-improvements)  
- [License](#license)  

---

## Project Overview

GenAI Recipe Generator allows users to create AI-generated recipes tailored to their ingredients, dietary preferences, cooking time, and more. Users can sign up or log in using Firebase Authentication or continue as guests with limited functionality. Saved recipes are stored securely in Firebase Realtime Database and accessible via a sleek hoverable side panel.

---

## Features

- AI-powered recipe generation using Google Gemini API  
- User authentication: sign up, log in, logout, and guest mode  
- Save and view personalized recipes in a hover-triggered side panel  
- Responsive, clean UI with robust input filtering and dynamic recipe display  
- Hot reloading and fast development experience via Vite  

---

## Tech Stack

- **Frontend:** React with hooks and functional components  
- **Backend:** FastAPI serving AI recipe generation endpoints  
- **AI API:** Google Gemini API for natural language recipe generation  
- **Database & Auth:** Firebase Authentication and Firebase Realtime Database  
- **Build Tools:** Vite for optimized development and production bundling  

---

## Getting Started

### Prerequisites

- Node.js and npm/yarn  
- Python 3.8+  
- Firebase project with Authentication and Realtime Database enabled  
- Google Gemini API access and API key  

### Setup

#### Backend

1. Navigate to backend folder and create a `.env` file with your Gemini API key:  

MY_API_KEY=your_gemini_api_key_here

2. Install Python dependencies:  

pip install -r requirements.txt

3. Run FastAPI backend server:  

uvicorn backend.app.main:app --reload


#### Frontend

1. Navigate to frontend folder:  

cd frontend

2. Create a `.env` file with Firebase config variables:  

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

3. Install dependencies:  

npm install

4. Start the React dev server:  

npm run dev


---

## Usage

- On landing page, log in or sign up with email/password, or continue as guest  
- Enter ingredients and preferences in the generator form  
- View generated recipes rendered in Markdown format dynamically  
- Save favorite recipes (only if logged in) via the save button  
- Access saved recipes quickly from the hoverable bookmark side panel  

---

## Project Structure

backend/
app/
api/
endpoints/
recipe.py # FastAPI route for recipe generation
models/
recipe_model.py # Pydantic model for input validation
services/
genai_service.py # Gemini AI recipe generation logic
main.py # FastAPI app setup including CORS and routing

frontend/
src/
api/
recipe-Api.js # API calls to backend recipe endpoint
components/
GeneratorForm.jsx # Form for recipe parameters input
LandingPage.jsx # Login/signup and guest access landing UI
LoadingSpinner.jsx # Loading indicator component
RecipeDisplay.jsx # Renders AI-generated Markdown recipe output
SavedRecipesSidePanel.jsx # Hoverable side panel for saved recipes
utils/
databaseHelpers.js # Firebase operations for saving/loading recipes
firebase.js # Firebase SDK initialization and config
App.jsx # Main React component orchestrating auth, state & UI

.env # Sensitive keys and config (excluded from repo)



---

## Screenshots

Add screenshots below to showcase the project UI.

### Landing Page

![Landing Page Screenshot](/Users/meeralizjoy/Desktop/genai_gemini/recipe-generator/frontend/src/assets/screenshots/landing-page.png)

---

### Recipe Generator

![Recipe Generator Screenshot](/Users/meeralizjoy/Desktop/genai_gemini/recipe-generator/frontend/src/assets/screenshots/recipe-generator.png)

---

### Saved Recipes Panel

![Saved Recipes Side Panel](/Users/meeralizjoy/Desktop/genai_gemini/recipe-generator/frontend/src/assets/screenshots/saved-recipes-panel.png)

---

*(Place your actual screenshot files in your repository and update the image paths accordingly.)*

---

## Future Improvements

- Implement better error handling and form validation  
- Add Google OAuth login with Firebase for easier authentication  
- Use Firebase Firestore for advanced query capabilities  
- Add user profiles and recipe rating or commenting  
- Include deployment scripts and continuous integration  
- Enhance UI/UX with animations and better mobile responsiveness  

---

## License

MIT License – feel free to use and extend this project as you wish.

---
