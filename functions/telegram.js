// functions/sendToTelegram.js

const axios = require('axios');

exports.handler = async function(event, context) {
    console.log(event.httpMethod);


    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
        
        const { name, email, telegram, message } = JSON.parse(event.body);
        
        // Format message for Telegram
        const telegramMessage = `
New Contact Form Submission:
------------------------
Name: ${name}
Telegram: ${telegram}
Email: ${email}
Message: ${message}
------------------------`;

        // Send to Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML'
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully' })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send message' })
        };
    }
};