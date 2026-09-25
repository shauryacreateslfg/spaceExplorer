exports.handler = async (event) => {
    const date = event.queryStringParameters?.date || '';
    const dateParam = date ? `&date=${date}` : '';
    const url = `https://api.nasa.gov/planetary/apod?apikey=ES4P7xSe9tJaFlwpWdadjsU3weA36nhPMjhdtZe6${dateParam}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(data)
    };
};