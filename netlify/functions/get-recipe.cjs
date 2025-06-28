import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.VITE_HF_TOKEN); // or HF_TOKEN
 console.log(hf);
const SYSTEM_PROMPT = `
You are a helpful assistant that provides cooking recipes based on the ingredients provided by the user.
You can also add ingredients if the given ones are not enough.
Respond with only the recipe and highlight the dish name.
`;

exports.handler = async function (event) {
  const { ingredients } = JSON.parse(event.body);
  const ingredientsString = ingredients.join(", ");

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
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
    console.error("❌ Hugging Face error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
