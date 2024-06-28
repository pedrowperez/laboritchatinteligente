import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

export const getChatResponse = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const apiError = error.response.data.error;
      if (apiError.type === 'insufficient_quota') {
        return 'Você excedeu sua cota atual. Por favor, verifique seu plano e detalhes de cobrança.';
      }
    }
    return 'Ocorreu um erro ao tentar obter a resposta. Por favor, tente novamente mais tarde.';
  }
};
