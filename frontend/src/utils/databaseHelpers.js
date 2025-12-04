import { db } from "../firebase";
import { ref, set, push, get } from "firebase/database";

// Save recipe for a user
export async function saveRecipeForUser(user, recipe) {
    const recipesRef = ref(db, `users/${user.uid}/recipes`);
    const newRecipeRef = push(recipesRef); // generates a unique id
    await set(newRecipeRef, {
        recipe,
        savedAt: Date.now(),
    });
}

// Load user's saved recipes
export async function getSavedRecipesForUser(user) {
    const recipesRef = ref(db, `users/${user.uid}/recipes`);
    const snapshot = await get(recipesRef);
    const recipes = [];
    if (snapshot.exists()) {
        snapshot.forEach(childSnap => {
            recipes.push({
                id: childSnap.key,
                ...childSnap.val(),
            });
        });
    }
    // Sort newest first (optional)
    recipes.sort((a, b) => b.savedAt - a.savedAt);
    return recipes;
}