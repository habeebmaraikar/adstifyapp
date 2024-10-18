import axios from 'axios';

//arts, automobiles, books/review, business, fashion, food, health, home, insider, magazine, movies, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, t-magazine, travel, upshot, us, world

//Times Newswire API
//https://api.nytimes.com/svc/news/v3/content/{source}/{section}.json?api-key=yourkey
//https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=yourkey
//https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.NYTIMES_API_KEY}


export async function GET(req) {
    //const url = new URL(req.url);
    //const section = url.searchParams.get('section') || 'all'; // Default to 'all' if no section is provided
    const { searchParams } = new URL(req.url); 
    const section = searchParams.get('section') || 'all';

  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/news/v3/content/all/${section}.json?api-key=${process.env.NYTIMES_API_KEY}`
    );

    return new Response(JSON.stringify(response.data.results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching news', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
    });
  }
}


