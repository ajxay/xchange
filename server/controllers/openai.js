import { Configuration, OpenAIApi } from "openai";

export const getSummary = async (req, res) => {
  console.log("reached");
  const { title } = req.query;
  console.log(title, "title");
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `review of book ${title}`,
      temperature: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      max_tokens: 1048,
    });
    console.log(completion, "completion");

    const summary = completion.data.choices[0].text;
    console.log(summary, "summary");

    res.status(200).json(summary);

    // res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
