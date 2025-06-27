import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(import.meta.env.VITE_HF_TOKEN);
 console.log(hf);
const SYSTEM_PROMPT = "You are a helpful assistant that provides cooking recipes based on the ingredients provided by the user, you can also add ingredients to the recipe if the given ingredients are not enough to make a recipe. You will only respond with the recipe and nothing else. Do not include any additional information or instructions.when you suggest recipe,highlight the dish name";
export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        console.log(response);
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}