
const express = require('express')
const axios = require('axios');

const router = express.Router()

const API_KEY = 'cq6gf31r01qlbj503g40cq6gf31r01qlbj503g4g';

// , "GOOGL", "AMZN", "META", "TSM", "BRK.A", "BRK.B",
//         "LLY", "TSLA", "AVGO", "MSFT", "MRNA", "PDD", "WMT", "V", "JPM", "PG",
//         "UNH", "HD", "BAC", "MA", "XOM", "KO", "PEP", "CSCO", "VZ", "CMCSA",
//         "INTC", "ADBE", "NFLX", "ABBV", "PYPL", "CRM", "ORCL", "T", "NVDA", 
//         "COST", "NKE", "AMGN", "QCOM", "MCD", "DHR", "TXN", "TMO", "MRK", 
//         "UPS", "HON", "IBM", "BMY", "LOW", "SCHW", "ACN", "ISRG", "RTX", 
//         "MS", "INTU", "GS", "NEE", "HUM", "ELV", "C", "MDT", "BKNG", "CAT", 
//         "SBUX", "BA", "DE", "MMM", "LMT", "GILD", "SPGI", "MDLZ", "ADI", 
//         "USB", "VRTX", "UNP", "PLD", "REGN", "LRCX", "MO", "FISV", "WM", 
//         "COP", "NOW", "TJX", "TMUS", "SYK", "ECL", "MU", "LVS", "PNC", 
//         "MCK", "CCI", "MAR", "PSA", "MELI", "SRE", "AMT", "FTNT", "AON", 
//         "EQIX"

router.get('/', async (req,res)=>{
    const listof100 = [
        "AAPL", "NVDA", "GOOG"
      ];
      
    //Fetch profile data for all companies
    const companyDataPromises = listof100.map(async (symbol) => {
        console.log(symbol)
        try {
            const profileResponse = await axios.get('https://finnhub.io/api/v1/stock/profile2', {
                params: {
                    symbol,
                    token: API_KEY,
                },
            });

            const quoteResponse = await axios.get('https://finnhub.io/api/v1/quote', {
                params: {
                    symbol,
                    token: API_KEY,
                },
            });

            const currentPrice = quoteResponse.data.c;
            const openPrice = quoteResponse.data.o;
            const percentageChange = ((currentPrice - openPrice) / openPrice) * 100;

            return {
                symbol: profileResponse.data.ticker ,
                name: profileResponse.data.name,
                currentPrice: quoteResponse.data.c,
                percentageChange: percentageChange.toFixed(2)+"%",
                marketCap: profileResponse.data.marketCapitalization,
                country: profileResponse.data.country,
                logo: profileResponse.data.logo
            };
        } catch (error) {
            console.error(`Error fetching profile for symbol ${symbol}:`, error.message);
            return null;
        }
    });
    const companiesData = await Promise.all(companyDataPromises);

    //console.log(profileResponse.data[0]+"1")
    res.json({companiesData})
    // res.json( {
    //     "symbol": "AAPL",
    //     "name": "Apple Inc",
    //     "currentPrice": 230.54,
    //     "percentageChange": "0.67%",
    //     "marketCap": 3535119.168533,
    //     "country": "US",
    //     "logo": "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png"
    // })
})

module.exports = router