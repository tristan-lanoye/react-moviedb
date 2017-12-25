import React from 'react'
const html = document.querySelector('html')

export default class Moviecard extends React.Component {
    render() {
        const data = this.props.data
        const poster = `https://image.tmdb.org/t/p/original${data.posterPath}`
        const backdrop = `https://image.tmdb.org/t/p/original${data.backdropPath}`
        html.style.background = `url(${backdrop}) center center / cover no-repeat fixed`
        return (
            <div className='grid-movie'>
                <img src={poster} className='movie-poster relative'/>
                <div className="grid-movie-details">
                    <div className='movie-title relative'>{data.title}</div>
                    <div className='movie-infos'> 
                        <span className='movie-date'>{data.date}</span> 
                        <span className='far fa-star'></span> 
                        <span className='movie-vote'>{data.vote}</span>
                        <span className='movie-runtime'>{Math.floor(data.runtime/60)}<strong>h</strong>{data.runtime % 60}</span>
                    </div>
                    {data.tagline != "" && <div className='movie-tagline'>{data.tagline}</div>}
                    <div className='movie-overview'>{data.overview}</div>
                </div>
            </div>
        )
    }
}