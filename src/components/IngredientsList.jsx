export default function IngredientList({ ingredients, onGetRecipe}) {
  return (
    ingredients.length > 0 && (
      <section>
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list">
          {ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {ingredients.length > 3 && (
          <div className="get-recipe-container">
            <div>
              <h3>Ready for recipe?</h3>
              <p className="generate-recipe-para">
                Generate a recipe from your list of ingredients.
              </p>
            </div>
            <button onClick={onGetRecipe} >Get a recipe</button>
          </div>
        )}
      </section>
    )
  );
}
