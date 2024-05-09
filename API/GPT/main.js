
const dotenv = require('dotenv');
dotenv.config();

async function openaiAPI(req,res) {
    try {
        const { model, temperature, max_tokens, messages } = req.body;

        if (!model || !temperature || !max_tokens || !messages) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        if (!process.env.OPENAI_KEY) {
            throw new Error('OPENAI_KEY not defined in environment variables');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_KEY}`
            },
            body: JSON.stringify({ model, temperature, max_tokens, messages })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
}

module.exports = openaiAPI;
