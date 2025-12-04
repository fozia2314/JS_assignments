document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const query = document.getElementById('query').value;

  // Fetch data from TVMaze API
  fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        console.log('No results found.');
      } else {
        console.log(`Results for "${query}":`);
        data.forEach(item => {
          const show = item.show;
          console.log(`- Name: ${show.name}`);
          console.log(`  Genres: ${show.genres.join(', ')}`);
          console.log(`  Language: ${show.language}`);
          console.log(`  Premiered: ${show.premiered}`);
          console.log(`  Summary: ${show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'N/A'}`);
          console.log('---------------------------');
        });
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
