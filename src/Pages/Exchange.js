import React from 'react'
import '../Styles/Exchange.css';

import Axios from "axios";
import { useState } from 'react';
// import RecipeTile from './component/RecipeTile';

function Exchange() {
    const [amt, setAmt] = useState(0)
    const [p_curr, setp_curr] = useState("BTC")
    const [s_curr, sets_curr] = useState("USD")
    const [exchangeData, setExchangeData] = useState(0)
    var url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${p_curr}&to_currency=${s_curr}&apikey=O4WNIMX3LMC9PEDU`

    async function getExchange() {
        var result = await Axios.get(url);
        setExchangeData(result.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
        console.log(result.data)

    }
    const currencies = ["BTC", "USD", "INR", "GBP", "EUR", "ETH", "XRP"]

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(amt)
        console.log(p_curr)
        console.log(s_curr)
        getExchange()
        
    }

    return (
        <div className="exchange">
            <h1>Just Crypto Currency Converter</h1>
            <div className="exchange_box">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="amount" className="amountl">Enter the Amount</label>
                    <input type="text" className="amount" name="amount" onChange={(e) => {
                        setAmt(e.target.value)

                    }} /><br />
                    <label htmlFor="p_curr" className="p_currl">Primary Currency</label>
                    <select name="p_curr" className="p_curr" value={p_curr}
                        onChange={(e) => {
                            setp_curr(e.target.value)
                        }} >
                        {currencies.map((curr) => {
                            return <option value={curr}>{curr}</option>
                        })}
                    </select>
                    <br />
                    <label htmlFor="s_curr">Convert to</label>
                    <select name="s_curr" className="s_curr" value={s_curr}
                        onChange={(e) => {
                            sets_curr(e.target.value)
                        }}>
                        {currencies.map((curr) => {
                            return <option value={curr}>{curr}</option>
                        })}
                    </select><br />
                    <input type="submit" className="submit" />
                </form>
                <div className="output">{`${amt} ${p_curr}= `}{amt*exchangeData}{` ${s_curr}`}</div>
            </div>
        </div>
    )
}

export default Exchange
