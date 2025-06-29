import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN);

const SYSTEM_PROMPT = `
You are a helpful chef that provides a recipe based on ingredients the user has.
Keep the recipe short and include the name of the dish.
`;


export async function handler(event) {
  const { ingredients } = JSON.parse(event.body);
  const ingredientsString = ingredients.join(", ");

  try {
    const response = await hf.chatCompletion({
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Give me a recipe.` },
      ],
      max_tokens: 512,
      temperature: 0.7,
    
    });
console.log("HF TOKEN:",hf.token);
    return {
      statusCode: 200,
       headers: {
    "Access-Control-Allow-Origin": "*",  // or restrict to your domain
    "Content-Type": "application/json",
  },
      body: JSON.stringify({
        recipe: response.choices[0].message.content,
      }),
    };
    
  } catch (err) {
    console.error("❌ Hugging Face error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
