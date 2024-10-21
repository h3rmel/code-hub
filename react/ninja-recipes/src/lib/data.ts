export async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");

  // delay response
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return result.json();
}

export async function getRecipe(id: string): Promise<Recipe> {
  const result = await fetch(`http://localhost:4000/recipes/${id}`);

  // delay response
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return result.json();
}
