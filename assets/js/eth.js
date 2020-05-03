const coinImg = document.querySelectorAll(".coin-img");
const coinName = document.querySelectorAll(".coin-name");
const coinSymbol = document.querySelectorAll(".coin-symbol");
const liPrice = document.querySelectorAll(".price");
const liChange24h = document.querySelectorAll(".price_change_24h");
const liPlus = document.querySelectorAll(".plus");
const li1hChange = document.querySelectorAll(".change1h");
const li24hChange = document.querySelectorAll(".change24h");
const li7dChange = document.querySelectorAll(".change7d");
const li14dChange = document.querySelectorAll(".change14d");
const li30dChange = document.querySelectorAll(".change30d");
const li1yChange = document.querySelectorAll(".change1y");
const liMarketCapRank = document.querySelectorAll(".market-cap-rank");
const liMarketCap = document.querySelectorAll(".market-cap");
const limarketCap24h = document.querySelectorAll(".market-cap-change-24h");
const liHigh24h = document.querySelectorAll(".high-24h");
const liLow24h = document.querySelectorAll(".low-24h");
//const cbPrice = document.querySelectorAll(".cbprice");
const siteTitle = document.querySelectorAll("title");
const cardUl = document.getElementById("coin-wrapper");


var myHeaders = new Headers();
myHeaders.append('pragma', 'no-cache');
myHeaders.append('cache-control', 'no-cache');

var myInit = {
method: 'GET',
headers: myHeaders,
};

function coinGeckoApi() {

  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=ethereum&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y", myInit)
  .then(response => response.json())
  .then(data => {

    console.log(data[0]);
    //liPrice[0].textContent = '€' + data[0].current_price;
    coinImg[0].src = data[0].image;
    coinName[0].textContent = data[0].name;
    coinSymbol[0].textContent = data[0].symbol;
    liChange24h[0].textContent = data[0].price_change_24h.toFixed(2) + '€ /24h';
    li1hChange[0].textContent = data[0].price_change_percentage_1h_in_currency.toFixed(1) + '%';
    li24hChange[0].textContent = data[0].price_change_percentage_24h_in_currency.toFixed(1) + '%';
    li7dChange[0].textContent = data[0].price_change_percentage_7d_in_currency.toFixed(1) + '%';
    li14dChange[0].textContent = data[0].price_change_percentage_14d_in_currency.toFixed(1) + '%';
    li30dChange[0].textContent = data[0].price_change_percentage_30d_in_currency.toFixed(1) + '%';
    li1yChange[0].textContent = data[0].price_change_percentage_1y_in_currency.toFixed(1) + '%';
    liMarketCapRank[0].textContent = '#' + data[0].market_cap_rank;
    liMarketCap[0].textContent = '€' + data[0].market_cap;
    limarketCap24h[0].textContent = data[0].market_cap_change_percentage_24h.toFixed(2) + '%';
    liHigh24h[0].textContent = '€' + data[0].high_24h.toFixed(2);
    liLow24h[0].textContent = '€' + data[0].low_24h.toFixed(2);

    function sparklines() {

        var coinValues = data[0].sparkline_in_7d.price;

        var coinData = {
          labels: [],
          series: [coinValues]
        };

        var options = {
          showPoint: false,
          lineSmooth: true,
          showArea: true,
          axisX: {
            showGrid: true,
            showLabel: true,
            offset: 0
          },
          axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        };

        var responsiveOptions = [
          ['screen and (min-width: 400px)', {
              height: '250px'
              }],
          ['screen and (min-width: 830px)', {
              height: '270px'
              }],
          ['screen and (min-width: 950px)', {
              height: '300px'
              }]
        ];

        new Chartist.Line('#chart-coin', coinData, options, responsiveOptions);

    }

    function addColors() {

      if (data[0].price_change_percentage_1h_in_currency.toFixed(1) <= -1.5) {
          li1hChange[0].style.color = "#e15241";
          liPrice[0].classList.add("downColor");
      } else if (data[0].price_change_percentage_1h_in_currency.toFixed(1) > -1.5 && data[0].price_change_percentage_1h_in_currency.toFixed(1) <= 0) {
          li1hChange[0].style.color = "#e15241";
          liPrice[0].style.color = "#e15241";
          if (liPrice[0].classList.contains("downColor")) {
              liPrice[0].classList.remove("downColor");
          }
          if (liPrice[0].classList.contains("upColor")) {
              liPrice[0].classList.remove("upColor");
          }
      } else if (data[0].price_change_percentage_1h_in_currency.toFixed(1) >= 0 && data[0].price_change_percentage_1h_in_currency.toFixed(1) < 1.5) {
          liPrice[0].style.color = "#4eaf0a";
          li1hChange[0].style.color = "#4eaf0a";
          if (liPrice[0].classList.contains("upColor")) {
              liPrice[0].classList.remove("upColor");
          }
          if (liPrice[0].classList.contains("downColor")) {
              liPrice[0].classList.remove("downColor");
          }
      } else {
          li1hChange[0].style.color = "#4eaf0a";
          liPrice[0].classList.add("upColor");
      }
      if (data[0].price_change_percentage_24h_in_currency.toFixed(1) <= 0) {
          li24hChange[0].style.color = "#e15241";
          liPlus[0].style.display = "none";
      } else {
          li24hChange[0].style.color = "#4eaf0a";
          liPlus[0].style.display = "inline";
      }
      if (data[0].price_change_percentage_7d_in_currency.toFixed(1) <= 0) {
          li7dChange[0].style.color = "#e15241";
      } else {
          li7dChange[0].style.color = "#4eaf0a";
      }
      if (data[0].price_change_percentage_14d_in_currency.toFixed(1) <= 0) {
          li14dChange[0].style.color = "#e15241";
      } else {
          li14dChange[0].style.color = "#4eaf0a";
      }
      if (data[0].price_change_percentage_30d_in_currency.toFixed(1) <= 0) {
          li30dChange[0].style.color = "#e15241";
      } else {
          li30dChange[0].style.color = "#4eaf0a";
      }
      if (data[0].price_change_percentage_1y_in_currency.toFixed(1) <= 0) {
          li1yChange[0].style.color = "#e15241";
      } else {
          li1yChange[0].style.color = "#4eaf0a";
      }
      if (data[0].market_cap_change_percentage_24h.toFixed(1) <= 0) {
          limarketCap24h[0].style.color = "#e15241";
      } else {
          limarketCap24h[0].style.color = "#4eaf0a";
      }

    }
    sparklines();
    addColors();

  });
}


function coinbaseApi() {

    var coin;

    fetch('https://api.pro.coinbase.com/products/ETH-EUR/ticker')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            coin = data;

            liPrice[0].textContent = '€' + parseFloat(coin.price).toFixed(2);
            siteTitle[0].textContent = 'ETH €' + parseFloat(coin.price).toFixed(2) + ' - Crypto Coins Now';

        }).catch(function (error) {
            console.log(error);
        });
    }

coinbaseApi();
setInterval(coinbaseApi, 5000);
coinGeckoApi();
setInterval(coinGeckoApi, 20000);