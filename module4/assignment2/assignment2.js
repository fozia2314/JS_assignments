// Select the form element
const form = document.getElementById('searchForm');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Get the value entered by the user
  const query = document.getElementById('query').value.trim();

  if (!query) {
    console.log('Please enter a TV series name.');
    return;
  }

  // Build the URL for TVMaze API
  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

  // Fetch data from the API
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        console.log(`No results found for "${query}".`);
        return;
      }

      console.log(`Search results for "${query}":`);
      data.forEach(item => {
        const show = item.show;
        console.log('----------------------------');
        console.log(`Name: ${show.name}`);
        console.log(`Genres: ${show.genres.join(', ')}`);
        console.log(`Language: ${show.language}`);
        console.log(`Premiered: ${show.premiered}`);
        console.log(`Summary: ${show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'N/A'}`);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
