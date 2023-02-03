import React from 'react'
import '../Styles/News.css'
import Axios from "axios";
import { useState, useEffect } from 'react';
import NewsItem from '../Component/NewsItem';

function News() {
    const [news, setnews] = useState([])
    useEffect(() => {
        Axios
            .get(
                `https://newsdata.io/api/1/news?apikey=pub_807129e4dd626449830626e10cf1f948bc59&q=cryptocurrency&language=en `
            )
            .then(res => {
                setnews(res.data.results);
                console.log(res.data.results);
            })
            .catch(error => console.log(error));
    }, []);


    return (
        <div className="news">
            <h1 className="title">Latest Crypto Market News</h1>

            <div className="newsList">
                {news.map((news) => {
                    return <NewsItem news={news}/>
                })}
            </div>

        </div>
    )
}

export default News
