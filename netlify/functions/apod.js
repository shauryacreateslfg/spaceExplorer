exports.handler = async (event) => {
    const date = event.queryStringParameters?.date || '';
    const dateParam = date ? `&date=${date}` : '';
    const url = `https://api.nasa.gov/planetary/apod?apikey=zu01UBg5J0K5vgujsNjRWU05ws6v3xJBf82t7e5I${dateParam}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(data)
    };
};