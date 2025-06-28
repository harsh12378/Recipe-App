import { useState } from "react";
import IngredientsList from "./IngredientsList";

import ReactMarkdown from "react-markdown";
export default function Main(){
const [ingredients,setIngredients]=useState([]);
const [recipeShown,setRecipeShown]=useState(false);
const [recipe,setRecipe]=useState("");
const [loading,setLoading]=useState(false);

async function handleGetRecipe(){
    setLoading(true);
    setRecipeShown(true);
     try{
        const response = await fetch("/.netlify/functions/get-recipe", {
  method: "POST",
  body: JSON.stringify({ ingredients })
  
   });
       const data = await response.json();
       setRecipe(data.recipe);
     }
     catch(err){
        setRecipe("Sorry, I couldn't generate a recipe at this time.")
     }
    
     setLoading(false);
     }
     


console.log(recipe );
console.log(recipeShown);


    // const ingredientList=ingredients.map(ingredient=>(
    //     <li key={ingredient} >{ingredient}</li>
    // ) )


    function handleSubmit(event){
        event.preventDefault();

        const formData=new FormData(event.target);
        const newIngredient=formData.get("ingredients");
        console.log(newIngredient);
        setIngredients([...ingredients, newIngredient]);
        console.log(ingredients);
    
        event.target.reset(); 


    }

    return (

        <main>
            <form className="add-ingredients-form"
               onSubmit={handleSubmit} >
                <input 
                type="text" aria-label="Add ingredients" 
                placeholder="e.g. tomatoes"
                name="ingredients"
                />
                <button type="submit">+ Add Ingredients</button> 
            </form>

           {<IngredientsList ingredients={ingredients} onGetRecipe={handleGetRecipe} />}
           {recipeShown && (
            <section className="recipe-section">
                <h2>Your Recipe</h2>
                {
                    loading ? (
                        <p>Loading recipe...</p>
                    ) : (
                        <div className="react-markdown">
                        <ReactMarkdown>{recipe}</ReactMarkdown>
                        </div>
                    )
                }
            </section>
           )}

        </main>

    )
    
}