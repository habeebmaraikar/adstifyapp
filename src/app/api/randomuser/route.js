import axios from 'axios';

// random user api
//`https://randomuser.me/api/`
//`https://randomuser.me/api/?results=50`

export async function GET(req) {
  try {
    const response = await axios.get(`https://randomuser.me/api/?results=50`);

    return new Response(JSON.stringify(response.data.results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching Random User', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Random User' }), {
      status: 500,
    });
  }
}


