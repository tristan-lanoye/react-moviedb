import React from 'react'

export default class MovieInf extends React.Component {
    render() {
        const data = this.props.data
        return (
            <div className="grid-infos">
                <div className='movie-title relative'>{data.title}</div>
                <div className='movie-infos'>
                    <span className='movie-date'>{data.date}</span>
                    <span className='far fa-star'></span>
                    <span className='movie-vote'>{data.vote}</span>
                    <span className='movie-runtime'>{Math.floor(data.runtime / 60)}h{data.runtime % 60}</span>
                </div>
                <div className='movie-genres'>
                    {data
                        .genres
                        .map((genre, i) => {
                            return <span className={`genre genre-${i}`} key={i}>{i != data.genres.length - 1
                                    ? `${genre}, `
                                    : `${genre}`}</span>
                        })}
                </div>
                {data.tagline != "" && <div className='movie-tagline'>{data.tagline}</div>}
                <div className='movie-overview'>{data.overview}</div>
                <div className='movie-director'>
                    <span className='director-job'>Director</span>
                    <span className='director-name'>{data.director.name}</span>
                </div>
                <div className='movie-actors'>
                    <span className='main-cast'>
                        Main Cast
                    </span>
                    {data
                        .actors
                        .map((actor, i) => {
                            return <span className={`actor actor-${i}`} key={i}>
                                <span>{i != data.actors.length - 1
                                        ? `${actor.name}, `
                                        : `${actor.name}`}</span>
                            </span>
                        })}
                </div>
                <div className='scroll-details' onClick={this.props.handleClick}>
                    <span>See cast photos and details</span>
                </div>
            </div>
        )
    }
}