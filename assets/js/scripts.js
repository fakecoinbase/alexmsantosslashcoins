const ul = document.getElementById('cardContainer');
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin%2Cethereum%2Cripple%2Clitecoin%2Cbitcoin-cash%2Ceos&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y';
const liPrice = document.querySelectorAll(".price");
const liChange24h = document.querySelectorAll(".price_change_24h");
const liPlus = document.querySelectorAll(".plus");
const li1hChange = document.querySelectorAll(".change1h");
const li24hChange = document.querySelectorAll(".change24h");
const li7dChange = document.querySelectorAll(".change7d");
const li14dChange = document.querySelectorAll(".change14d");
const li30dChange = document.querySelectorAll(".change30d");
const li1yChange = document.querySelectorAll(".change1y");
const limarketCap24h = document.querySelectorAll(".market_cap");

var myHeaders = new Headers();
myHeaders.append('pragma', 'no-cache');
myHeaders.append('cache-control', 'no-cache');

var myInit = {
  method: 'GET',
  headers: myHeaders,
};

function loadCoins() {
  fetch(url, myInit)
  .then(response => response.json())
  .then(data => {
    for (i = 0; i < data.length; ++i) {
        liPrice[i].textContent = '€' + data[i].current_price;
        liChange24h[i].textContent = data[i].price_change_24h.toFixed(2) + '€ /24h';
        li1hChange[i].textContent = data[i].price_change_percentage_1h_in_currency.toFixed(1) + '%';
        li24hChange[i].textContent = data[i].price_change_percentage_24h_in_currency.toFixed(1) + '%';
        li7dChange[i].textContent = data[i].price_change_percentage_7d_in_currency.toFixed(1) + '%';
        li14dChange[i].textContent = data[i].price_change_percentage_14d_in_currency.toFixed(1) + '%';
        li30dChange[i].textContent = data[i].price_change_percentage_30d_in_currency.toFixed(1) + '%';
        li1yChange[i].textContent = data[i].price_change_percentage_1y_in_currency.toFixed(1) + '%';
        limarketCap24h[i].textContent = data[i].market_cap_change_percentage_24h.toFixed(2) + '%';

        if (data[i].price_change_percentage_1h_in_currency.toFixed(1) <= 0) {
            li1hChange[i].style.color = "#e15241";
            liPrice[i].style.color = "#e15241";
        } else if (data[i].price_change_percentage_1h_in_currency.toFixed(1) >= 1.5) {
            liPrice[i].style.color = "#4eaf0a";
            liPrice[i].classList.add("upColor");
            li1hChange[i].style.color = "#4eaf0a";
        } else {
            li1hChange[i].style.color = "#4eaf0a";
            liPrice[i].style.color = "#4eaf0a";
            if (liPrice[i].classList.contains("upColor")) {
                liPrice[i].classList.remove("upColor");
            }
        }
        if (data[i].price_change_percentage_24h_in_currency.toFixed(1) <= 0) {
            li24hChange[i].style.color = "#e15241";
            liPlus[i].style.display = "none";
        } else {
            li24hChange[i].style.color = "#4eaf0a";
            liPlus[i].style.display = "inline";
        }
        if (data[i].price_change_percentage_7d_in_currency.toFixed(1) <= 0) {
            li7dChange[i].style.color = "#e15241";
        } else {
            li7dChange[i].style.color = "#4eaf0a";
        }
        if (data[i].price_change_percentage_14d_in_currency.toFixed(1) <= 0) {
            li14dChange[i].style.color = "#e15241";
        } else {
            li14dChange[i].style.color = "#4eaf0a";
        }
        if (data[i].price_change_percentage_30d_in_currency.toFixed(1) <= 0) {
            li30dChange[i].style.color = "#e15241";
        } else {
            li30dChange[i].style.color = "#4eaf0a";
        }
        if (data[i].price_change_percentage_1y_in_currency.toFixed(1) <= 0) {
            li1yChange[i].style.color = "#e15241";
        } else {
            li1yChange[i].style.color = "#4eaf0a";
        }
        if (data[i].market_cap_change_percentage_24h.toFixed(1) <= 0) {
            limarketCap24h[i].style.color = "#e15241";
        } else {
            limarketCap24h[i].style.color = "#4eaf0a";
        }

    }

  });
}

loadCoins();
setInterval(loadCoins, 20000);