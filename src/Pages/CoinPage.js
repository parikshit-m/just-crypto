import React from 'react'
import { useParams } from 'react-router-dom'
import '../Styles/CoinPage.css'
import ReactHtmlParser from "react-html-parser";
import Axios from "axios";
import { useEffect, useState } from 'react'
// import { Line } from "react-chartjs-2";

function CoinPage() {

    const [coinData, setcoinData] = useState({});
    const [img, setimg] = useState("");
    const [mcap, setmcap] = useState(0);
    const [cp, setcp] = useState(0);
    const [desc, setdesc] = useState("");
    // const [historicData, setHistoricData] = useState();
    // eslint-disable-next-line
    const [days, setDays] = useState(1);

    const { id } = useParams();
    useEffect(() => {
        Axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
            )
            .then(res => {
                setcoinData(res.data);
                setimg(res.data["image"]["large"])
                setmcap(res.data["market_data"]["market_cap"]["usd"])
                setcp(res.data["market_data"]["current_price"]["usd"])
                setdesc(res.data["description"]['en'])
                console.log(res.data["description"]['en']);
            })
            .catch(error => console.log(error));
    }, []);

    const HistoricalChart = (id, days = 365, currency) =>
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
    const fetchHistoricData = async () => {
        const { data } = await Axios.get(HistoricalChart(id, days));
        // setflag(true);
        console.log(data.prices)
        // setHistoricData(data.prices);
    };
    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    





    return (
        <div className="coinPage">
            <div className="coinInfo">
                <div className="img" style={{ backgroundImage: `url(${img})` }}></div>
                <h1 className="coinName">{coinData["name"]}</h1>
                <h6>{coinData["symbol"]}</h6>
                <h1>Market Cap : {`$ ${Math.round(mcap / 1000000)}M`}</h1>
                <h1>Current Price : {`$ ${cp}`}</h1>
                <p>{ReactHtmlParser(desc)}</p>
            </div>
            {/* <Line
              data={{
                labels: [historicData.map((coin)=>{
                    let date = new Date(coin[0]);
                    let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                })],

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in usd`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            /> */}

        </div>
    )
}

export default CoinPage
