export async function generateRecipe(params) {
    const response = await fetch("http://127.0.0.1:8000/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error("API error");
    return response.json();
}