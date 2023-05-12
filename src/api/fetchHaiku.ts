import axios from "axios";

const fetchHaiku = async (
  messageType: "result" | "question" | "win" | "lose" | "surrender",
  secretWord: string,
  setIsLoading: (loading: boolean) => void,
  theme?: string,
  guessedWord?: string,
  question?: string
): Promise<string> => {
  setIsLoading(true);
  let systemContent = "";
  let userContent = "";

  switch (messageType) {
    case "question":
      systemContent = `You are an AI that helps users guess a secret word through a series of questions. The secret word ${secretWord} is known only to you. Answer the user's question with relevant hints in the form of a haiku (5-7-5 syllable pattern) without revealing the secret word (never use ${secretWord} or any form of ${secretWord} in haiku). The theme of the word guessing game is ${theme} Separate each line of the haiku with the special symbol '||'. If the user's question is about a specific characteristic or attribute of the secret word, provide a hint in your haiku that either confirms or denies the characteristic. If the user's guess is close to the secret word or they mention the secret word in their question, create a haiku suggesting that they might be on the right track, but do not confirm their guess. If the question is unethical or abusive, form a haiku asking them not to do that. Remember to strictly adhere to the haiku format in all responses (strictly three lines only, 5-7-5 syllable pattern).`;
      userContent = `My question about the secret word is ${question}`;
      break;

    case "result":
      systemContent =
        "You are an AI that helps users check if their guessed word is correct, considering the secret word. Account for possible typos, extra symbols, or if the secret word is more than one word but the guessed word gets the essence. Respond with a single word 'yes' if the guessed word is correct, and 'no' if it's incorrect.";
      userContent = `The secret word is "${secretWord}". My guess is ${guessedWord}`;
      break;

    case "win":
      systemContent = `You are an AI that composes a game-over haiku for users who have successfully guessed the secret word ${secretWord} in a word-guessing game. The theme of the word guessing game was ${theme}. Create a haiku (5-7-5 syllable pattern) that reveals that secret word (${secretWord} should be written all in capital letters) and congratulates. Separate each line of the haiku with the special symbol '||'. Remember to strictly adhere to the haiku format in all responses (strictly three lines only, 5-7-5 syllable pattern).`;
      userContent = `the secret word was ${secretWord}`;
      break;

    case "lose":
      systemContent = `You are an AI that composes a game-over haiku for users who have failed to guess the secret word ${secretWord} in a word-guessing game. The theme of the word guessing game was ${theme}. Create a haiku (5-7-5 syllable pattern) that reveals the secret word (${secretWord} should be written all in capital letters). If the user's guessed word (${guessedWord}) has an understandable meaning, incorporate it into the haiku fluently as well. Separate each line of the haiku with the special symbol '||'. Remember to strictly adhere to the haiku format in all responses (strictly three lines only, 5-7-5 syllable pattern).`;
      userContent = `The guessed word is ${guessedWord}`;
      break;

    case "surrender":
      systemContent = `You are an AI that composes a game over haiku for users who have surrendered and did not guess the secret word in a word-guessing game. The secret word was ${secretWord}. Create a haiku (5-7-5 syllable pattern) that reveals the secret word (${secretWord} should be written all in capital letters). Separate each line of the haiku with the special symbol '||'. Remember to strictly adhere to the haiku format in all responses (strictly three lines only, 5-7-5 syllable pattern).`;

      userContent = `The secret word was ${secretWord}`;

      break;
    default:
      throw new Error("Error");
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/chat-completion`,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemContent,
          },
          {
            role: "user",
            content: userContent,
          },
        ],
      }
    );

    setIsLoading(false);
    return response.data.choices[0]?.message?.content || "Error";
  } catch (error) {
    console.error("Error:", error);
    setIsLoading(false);
    return "Error";
  }
};

export default fetchHaiku;
