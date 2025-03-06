// const obj = '1';

// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify(obj),
// })
//   .then(response => response.json())
//   .then(json => console.log(json));

const searchInput = document.getElementById('search');
const messageDiv = document.getElementById('message');
const countryList = document.getElementById('country-list');
const resultDiv = document.getElementById('result');

async function fetchCountries(main) {
  if (!main) return [];
  try {
    const response = await fetch(`https://restcountries.com/v2/name/${main}`);
    if (!response.ok) throw new Error('Country not found');
    return await response.json();
  } catch (error) {
    return [];
  }
}

const handleSearch = _.debounce(async () => {
  const main = searchInput.value.trim();
  const results = await fetchCountries(main);
  messageDiv.textContent = '';
  countryList.innerHTML = '';
  resultDiv.innerHTML = '';

  if (results.length > 10) {
    messageDiv.textContent =
      'Too many matches found. Please specify your search.';
  } else if (results.length > 1) {
    results.forEach(country => {
      const li = document.createElement('li');
      li.textContent = country.name;
      countryList.appendChild(li);
    });
  } else if (results.length === 1) {
    const country = results[0];
    resultDiv.innerHTML = `
                    <h2>${country.name}</h2>
                    <p>Capital: ${country.capital}</p>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Languages: ${country.languages
                      .map(lang => lang.name)
                      .join(', ')}</p>
                    <img src="${country.flag}" alt="Flag of ${country.name}">
                `;
  } else {
    messageDiv.textContent = 'No matches found.';
  }
}, 500);

searchInput.addEventListener('input', handleSearch);
