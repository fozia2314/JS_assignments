// URL for random Chuck Norris joke
const url = 'https://api.chucknorris.io/jokes/random';

// Fetch a random joke
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Print only the joke (the 'value' property)
    console.log('Random Chuck Norris Joke:');
    console.log(data.value);
  })
  .catch(error => {
    console.error('Error fetching joke:', error);
  });
