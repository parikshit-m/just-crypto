import React from 'react'
import '../Styles/CoinTable.css'
import Axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function CoinTable() {
    let navigate = useNavigate(); 


    const [coinData, setcoinData] = useState([]);
    const [search, setsearch] = useState("");
    // const [c, setc] = useState("USD");
    const [n, setn] = useState(10);
    // const [slice, setslice] = useState([]);




    // async function getAllCoinData() {

    //     var url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
    //     var result = await Axios.get(url);
    //     setallCoinData(result.data);
    //     console.log(result.data)

    // }
    useEffect(() => {
        Axios
            .get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false`
            )
            .then(res => {
                setcoinData(res.data);
                // console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const filteredCoins = coinData.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())

    );
    var slicedData = filteredCoins.slice(0, n);

    var handleNext = () => {
       setn(n + 10)
    }




    return (

        <div className="coinTable" >
            <h1  >Top Crypto Currencies</h1>
            <input type="text" placeholder="Search for Crypto Currency..." onChange={(e) => {

                setsearch(e.target.value)

            }} />
            {/* <div style="overflow-x:auto"> */}

            <table>
                <thead>
                    <tr className="tableHead">
                        <th>Coin</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedData.map((coin) => {
                        return (
                            // <Link to={`/coins/${coin["id"]}`}>
                            <tr className="tableRow" onClick={()=>{
                                navigate(`/coins/${coin["id"]}`);
                            }}>
                                <td><img src={coin["image"]} alt="" /> <p> {coin["name"]}({coin["symbol"]})</p></td>
                                <td>{"$" + coin["current_price"]}</td>
                                <td>{Math.round(coin["price_change_percentage_24h"] * 100) / 100 + "%"}</td>
                                <td>{"$" + Math.round(coin["market_cap"] / 1000000) + "M"}</td>

                            </tr>
                            // </Link>
                        )
                    })}
                </tbody>
            </table>
            {/* </div> */}
            <button onClick={handleNext} disabled={n+10>filteredCoins.length?true:false}>Load More</button>

        </div>
    )
}

export default CoinTable
