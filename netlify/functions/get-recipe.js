// netlify/functions/get-recipe.js
import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.VITE_HF_TOKEN);

 console.log(hf);
const SYSTEM_PROMPT = "You are a helpful assistant that provides cooking recipes based on the ingredients provided by the user, you can also add ingredients to the recipe if the given ingredients are not enough to make a recipe. You will only respond with the recipe and nothing else. Do not include any additional information or instructions.when you suggest recipe,highlight the dish name";

export async function handler(event) {
  const { ingredients } = JSON.parse(event.body);
  const ingredientsString = ingredients.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Give me a recipe!` },
      ],
      max_tokens: 1024,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: response.choices[0].message.content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
