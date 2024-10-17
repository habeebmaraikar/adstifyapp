// api/news.js
import axios from 'axios';

//top stories
//https://api.nytimes.com/svc/topstories/v2/{section}.json?api-key=${process.env.NYTIMES_API_KEY}
//https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYTIMES_API_KEY}
//https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${process.env.NYTIMES_API_KEY}

//arts, automobiles, books/review, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const section = url.searchParams.get('section') || 'world'; // Default to 'home' if no section is provided

    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.NYTIMES_API_KEY}`
    );

    return new Response(JSON.stringify(response.data.results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching topstories', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch topstories' }), {
      status: 500,
    });
  }
}


