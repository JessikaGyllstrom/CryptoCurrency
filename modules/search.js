import { hideLoading, displayLoading } from "./loader.js";

export function search() {
  const searchRes = document.getElementById('searchRes')
  const searchTitle = document.getElementById('searchTitle')
  //hide elements
  searchRes.classList.add('hidden')
  searchTitle.classList.add('hidden')
  //fetch coins
  async function performSearch() {
    //display loader
    displayLoading()
    const searchTxt = document.getElementById('searchTxt').value
    const url = `https://coinranking1.p.rapidapi.com/search-suggestions?referenceCurrencyUuid=yhjMzLPhuIDl&query=${searchTxt}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'key',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options)
    //!not a propper use, just want to display loader!
    await delay(1700);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      throw new Error(message)
    }
    const obj = await response.json()
    //hide loader
    hideLoading()
    return obj
  }
  performSearch().then((obj) => {
    console.log(obj)
    //display elements
    searchRes.classList.remove('hidden')
    searchTitle.classList.remove('hidden')
    //get length of coins array
    const arrLength = obj.data.coins.length
    searchTitle.innerHTML = "Search results: ";

    if (arrLength == 0) {
      console.log("no res")
      searchTitle.innerHTML += `<span>0<br>Sorry no match!</span>`;
    }
    //if array isnt empty
    else { 
      let price = ""
      console.log(obj.data.coins.length)
      for (let i = 0; i < arrLength; i++) {
        //if price is null
        if (obj.data.coins[i].price == null) {
          console.log("price unknown")
          price = "Unknown"
        }
        else {
          price = obj.data.coins[i].price
        }
        //display fetched data
        const ul = document.getElementById('result')
        const li = document.createElement('li')
        console.log(obj.data.coins[i].name)
        li.innerHTML = `<div class="card"><div class="upper"><div><img src="${obj.data.coins[i].iconUrl}" width="80"></img></div>
          <div><h4>${obj.data.coins[i].name}</h4></div><div class="info">
          <b>Price: </b>${price}</div></div>`;
        ul.appendChild(li)
      }
    }
  }).catch(error => {
    //coins request failed
    console.log(error)
  })
} 
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
