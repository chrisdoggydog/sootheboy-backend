const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
 
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
 
app.post('/soothe', async (req, res) => {
  const { message } = req.body;
 
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a supportive, emotionally intelligent therapist AI.' },
        { role: 'user', content: message },
      ],
    });
 
res.json({ response: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
