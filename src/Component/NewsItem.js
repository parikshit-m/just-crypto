import React from 'react'
import '../Styles/News.css'
import just_crypto from '../Assets/JustCrypto.jpg'
function NewsItem({ news }) {
    return (
        <a href={news["link"]} target="_blank" rel="noopener noreferrer">
            <div className="card">
                <img src={news["image_url"] == null ? just_crypto : news["image_url"]} className="card__image" alt="" />
                <div className="card__content">
                    <h1>{news["title"]}</h1>
                    <p className="description">{news["description"]==null?"No Description":news["description"].slice(0, 200) + "..."}</p>
                    <p className="card__date">{news["pubDate"]}</p>
                </div>
            </div>
        </a>
    )
}

export default NewsItem
