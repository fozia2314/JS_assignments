const form = document.getElementById('searchForm');
const jokesContainer = document.getElementById('jokesContainer');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const query = document.getElementById('query').value.trim();
  jokesContainer.innerHTML = ''; // Clear previous results

  if (!query) {
    console.log('Please enter a search term.');
    return;
  }

  const url = `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.total === 0) {
        jokesContainer.innerHTML = '<p>No jokes found.</p>';
        console.log(`No jokes found for "${query}".`);
        return;
      }

      console.log(`Jokes for "${query}":`);
      data.result.forEach(joke => {
        console.log(joke.value);

        // Display joke in <article>
        const article = document.createElement('article');
        const p = document.createElement('p');
        p.textContent = joke.value;
        article.appendChild(p);
        jokesContainer.appendChild(article);
      });
    })
    .catch(error => {
      console.error('Error fetching jokes:', error);
    });
});
