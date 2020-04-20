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
//const cbPrice = document.querySelectorAll(".cbprice");

var myHeaders = new Headers();
myHeaders.append('pragma', 'no-cache');
myHeaders.append('cache-control', 'no-cache');

var myInit = {
  method: 'GET',
  headers: myHeaders,
};

function coinGeckoApi() {
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin%2Cethereum%2Cripple%2Clitecoin%2Cbitcoin-cash%2Ceos%2Cstellar%2Cethereum-classic%2C0x&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y", myInit)
  .then(response => response.json())
  .then(data => {
    var i;
    for (i = 0; i < data.length; ++i) {

        //liPrice[i].textContent = '€' + data[i].current_price;
        liChange24h[i].textContent = data[i].price_change_24h.toFixed(2) + '€ /24h';
        li1hChange[i].textContent = data[i].price_change_percentage_1h_in_currency.toFixed(1) + '%';
        li24hChange[i].textContent = data[i].price_change_percentage_24h_in_currency.toFixed(1) + '%';
        li7dChange[i].textContent = data[i].price_change_percentage_7d_in_currency.toFixed(1) + '%';
        li14dChange[i].textContent = data[i].price_change_percentage_14d_in_currency.toFixed(1) + '%';
        li30dChange[i].textContent = data[i].price_change_percentage_30d_in_currency.toFixed(1) + '%';
        li1yChange[i].textContent = data[i].price_change_percentage_1y_in_currency.toFixed(1) + '%';
        limarketCap24h[i].textContent = data[i].market_cap_change_percentage_24h.toFixed(2) + '%';

        function sparklines() {

            var btcValues = data[0].sparkline_in_7d.price;
            var ethValues = data[1].sparkline_in_7d.price;
            var xrpValues = data[2].sparkline_in_7d.price;
            var bchValues = data[3].sparkline_in_7d.price;
            var ltcValues = data[4].sparkline_in_7d.price;
            var eosValues = data[5].sparkline_in_7d.price;
            var xlmValues = data[6].sparkline_in_7d.price;
            var etcValues = data[7].sparkline_in_7d.price;
            var zrxValues = data[8].sparkline_in_7d.price;

            var btcData = {
              labels: [],
              series: [btcValues]
            };
            var ethData = {
              labels: [],
              series: [ethValues]
            };
            var xrpData = {
              labels: [],
              series: [xrpValues]
            };
            var bchData = {
              labels: [],
              series: [bchValues]
            };
            var ltcData = {
              labels: [],
              series: [ltcValues]
            };
            var eosData = {
              labels: [],
              series: [eosValues]
            };
            var xlmData = {
              labels: [],
              series: [xlmValues]
            };
            var etcData = {
              labels: [],
              series: [etcValues]
            };
            var zrxData = {
              labels: [],
              series: [zrxValues]
            };

            var options = {
              showPoint: false,
              lineSmooth: false,
              width: '133px',
              height: '70px',
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

            new Chartist.Line('#chart1', btcData, options);
            new Chartist.Line('#chart2', ethData, options);
            new Chartist.Line('#chart3', xrpData, options);
            new Chartist.Line('#chart4', bchData, options);
            new Chartist.Line('#chart5', ltcData, options);
            new Chartist.Line('#chart6', eosData, options);
            new Chartist.Line('#chart7', xlmData, options);
            new Chartist.Line('#chart8', etcData, options);
            new Chartist.Line('#chart9', zrxData, options);

        }

        sparklines();

        /////////// Colors ///////////
        if (data[i].price_change_percentage_1h_in_currency.toFixed(1) <= -1.5) {
            li1hChange[i].style.color = "#e15241";
            liPrice[i].classList.add("downColor");
        } else if (data[i].price_change_percentage_1h_in_currency.toFixed(1) > -1.5 && data[i].price_change_percentage_1h_in_currency.toFixed(1) <= 0) {
            li1hChange[i].style.color = "#e15241";
            liPrice[i].style.color = "#e15241";
            if (liPrice[i].classList.contains("downColor")) {
                liPrice[i].classList.remove("downColor");
            }
        } else if (data[i].price_change_percentage_1h_in_currency.toFixed(1) >= 0 && data[i].price_change_percentage_1h_in_currency.toFixed(1) < 1.5) {
            liPrice[i].style.color = "#4eaf0a";
            li1hChange[i].style.color = "#4eaf0a";
            if (liPrice[i].classList.contains("upColor")) {
                liPrice[i].classList.remove("upColor");
            }
        } else {
            li1hChange[i].style.color = "#4eaf0a";
            liPrice[i].classList.add("upColor");
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


function coinbaseApi() {

    var btc, eth, xrp, bch, ltc, eos, xlm, etc, zrx;

    fetch('https://api.pro.coinbase.com/products/BTC-EUR/ticker')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            btc = data;

            return fetch('https://api.pro.coinbase.com/products/ETH-EUR/ticker');

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            eth = data;

            return fetch('https://api.pro.coinbase.com/products/XRP-EUR/ticker');

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            xrp = data;

            return fetch('https://api.pro.coinbase.com/products/BCH-EUR/ticker');

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            bch = data;

            return fetch('https://api.pro.coinbase.com/products/LTC-EUR/ticker');

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            ltc = data;

            return fetch('https://api.pro.coinbase.com/products/EOS-EUR/ticker');

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            eos = data;

            return fetch('https://api.pro.coinbase.com/products/XLM-EUR/ticker');

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            xlm = data;

            return fetch('https://api.pro.coinbase.com/products/ETC-EUR/ticker');

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            etc = data;

            return fetch('https://api.pro.coinbase.com/products/ZRX-EUR/ticker');

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            zrx = data;

            liPrice[0].textContent = '€' + parseFloat(btc.price).toFixed(2);
            liPrice[1].textContent = '€' + parseFloat(eth.price).toFixed(2);
            liPrice[2].textContent = '€' + parseFloat(xrp.price).toFixed(4);
            liPrice[3].textContent = '€' + parseFloat(bch.price).toFixed(2);
            liPrice[4].textContent = '€' + parseFloat(ltc.price).toFixed(2);
            liPrice[5].textContent = '€' + parseFloat(eos.price).toFixed(3);
            liPrice[6].textContent = '€' + parseFloat(xlm.price).toFixed(4);
            liPrice[7].textContent = '€' + parseFloat(etc.price).toFixed(3);
            liPrice[8].textContent = '€' + parseFloat(zrx.price).toFixed(4);

        }).catch(function (error) {
            console.log(error);
        });
    }

coinbaseApi();
setInterval(coinbaseApi, 5000);
coinGeckoApi();
setInterval(coinGeckoApi, 20000);