// api/news.js
import axios from 'axios';

// weather api
//`https://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${location}`

export async function GET(req) {
    //const url = new URL(req.url);
    //const location = url.searchParams.get('location') || 'Singapore'; // Default to 'Singapore' if no section is provided
    const { searchParams } = new URL(req.url); 
    const location = searchParams.get('location') || 'Singapore';

  try {
    /*const response1 = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );*/

    const response = await axios.get(
      `https://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${location}`
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Weather API error', error);

    if (error.response && error.response.data.error.code === 104) {
      return new Response(JSON.stringify({ error: "Monthly usage limit reached. Upgrade your plan." }), {
        status: 403,
      });
    }

    return new Response(JSON.stringify({ error: 'Failed to fetch Weather' }), {
      status: 500,
    });
  }
}


