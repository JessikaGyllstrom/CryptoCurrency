//fetch coins
export async function fetchCoins() {
  const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=40&offset=0';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3a900876b7mshc5feaf14abc8e86p141c41jsnc286247fea9b',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  const response = await fetch(url, options)
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const obj = await response.json()
  return obj
}
fetchCoins().then((obj) => {
  console.log(obj)
  //get length of coins array
  const arrLength = obj.data.coins.length
    
  console.log(obj.data.coins.length)
  for (let i = 0; i < arrLength; i++) {
    console.log(obj.data.coins[i].name)
    //display fetched data
    const ul = document.getElementById('list')
    const li = document.createElement('li')
    li.innerHTML = `<div class="card"><div class="upper"><div><img src="${obj.data.coins[i].iconUrl}" width="80"></img></div>
      <div class="rank"><span>#</span>${obj.data.coins[i].rank}</div><div><h4>${obj.data.coins[i].name}</h4></div><div class="info"><b>BtcPrice: </b>${obj.data.coins[i].btcPrice}<br>
      <b>Price: </b>${obj.data.coins[i].price}<br>
      <b>Change: </b>${obj.data.coins[i].change}
    </div></div>`;
    ul.appendChild(li)
  }
}).catch(error => {
  //coins request failed
})