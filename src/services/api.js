const baseURL = 'https://api.unsplash.com';

export const searchImages = async (page, query, color = null, orientation = null) => {
  const searchResult = await fetch(
    `${baseURL}/search/photos/?page=${page}&query=${query}${color && color !== 'None' ? `&color=${color}` : ''}${orientation && orientation !== 'None' ? `&orientation=${orientation}` : ''}`,
    { method: 'GET', headers: { Authorization: 'Client-ID 9OrTxAvDHhbdGnBnn3XJ0Du0cHhcoFXKvJ3QDpuwGFk' }}
    );
  const searchResultJSON = await searchResult.json();
  return searchResultJSON;
}