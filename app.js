fetch('./coins.json')
  .then(response => response.json())
  .then(coinlist => populateAutocomplete(coinlist))
  .then(coinlist => coinlist[Math.floor(Math.random() * coinlist.length)])
  .then(coin => renderInterface(coin));


function populateAutocomplete(coinlist) {
  coinlist.forEach(coin => {
    const option = document.createElement('option');
    option.value = `${coin.name} (${coin.symbol})`
    document.getElementById('coinlist').appendChild(option);
  })

  return coinlist
}

function removeObviousTags(name, tags) {
  const filteredTags = tags.filter(tag => !tag.includes(name.toLowerCase()))
  return filteredTags
}

function formatCurrency(float) {
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  return formatter.format(float)
}

function renderInterface(coin) {
  document.getElementById('market_cap').innerHTML = formatCurrency(coin.quote.USD.market_cap)
  document.getElementById('volume_24h').innerHTML = formatCurrency(coin.quote.USD.volume_24h)

  const tags = removeObviousTags(coin.name, coin.tags)
  tags.forEach(tag => {
    const li = document.createElement('li');
    li.innerHTML = tag
    document.getElementById('tags').appendChild(li);
  })

  document.getElementById('circulating_supply').innerHTML = formatCurrency(coin.circulating_supply)
  document.getElementById('total_supply').innerHTML = formatCurrency(coin.total_supply)
  document.getElementById('max_supply').innerHTML = formatCurrency(coin.max_supply)
  
  document.getElementById('price_usd').innerHTML = formatCurrency(coin.quote.USD.price)

  document.getElementById("stats").classList.remove("hidden")

  const guesses = document.getElementById('guesses')
  guesses.classList.remove("hidden")
  guesses.addEventListener('submit', processGuess)
}

function processGuess(e) {
  e.preventDefault()

  guesses = document.querySelectorAll('input[name="guess[]"]')
  console.log(guesses)

  // if win, do something
  // if not win, do something else

  return false;
}