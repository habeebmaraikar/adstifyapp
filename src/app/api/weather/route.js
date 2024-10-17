// api/news.js
import axios from 'axios';

// weather api
//`https://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${location}`

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const location = url.searchParams.get('location') || 'Singapore'; // Default to 'Singapore' if no section is provided

    /*const response1 = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );*/

    const response = await axios.get(
      ` https://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${location}`
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching Weather', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Weather' }), {
      status: 500,
    });
  }
}


