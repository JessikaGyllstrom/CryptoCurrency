import { search } from "./modules/search.js";
import { fetchCoins } from "./modules/fetchCoins.js";
import { hideLoading } from "./modules/loader.js";

document.getElementById('searchBtn').addEventListener("click", function () {
  let searchTxt = document.getElementById('searchTxt').value 
  console.log(searchTxt)
  if (searchTxt == "") {
    console.log("empty search")
    alert("Input cant be empty!")
  } 
  else {
    search()
    //clear input 
    searchTxt = ""
    //clear searchresult
    document.getElementById("result").innerHTML = "";
  }
});
