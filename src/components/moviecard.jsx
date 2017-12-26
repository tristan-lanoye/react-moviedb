import React from 'react'
const html = document.querySelector('html')

export default class Moviecard extends React.Component {
    render() {
        const data = this.props.data
        const poster = `https://image.tmdb.org/t/p/w500${data.posterPath}`
        const backdrop = `https://image.tmdb.org/t/p/w1280${data.backdropPath}`
        if (data.backdropPath != null) {
            html.style.background = `url(${backdrop}) center center / cover no-repeat fixed`
            html.style.minHeight = '100%'
        } else {
            html.style.background = 'rgb(34,34,34)'
        }
        return (
            <div className='grid-movie'>
                <div className='movie-poster relative'>
                    <img src={poster} alt=""/>
                </div>
                <div className="grid-movie-details">
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
                            .mainActors
                            .map((actor, i) => {
                                return <span className={`actor actor-${i}`} key={i}>
                                    <span>{i != data.mainActors.length - 1
                                            ? `${actor.name}, `
                                            : `${actor.name}`}</span>
                                </span>
                            })}
                    </div>
                    <div className='see-full'>
                        <span>See full cast and details</span>
                    </div>
                </div>

                <div className='grid-recommendations'>
                    {data.recommendations != '' && <span className='title'>Recommendations</span>}
                    {data
                        .recommendations
                        .map((movie, i) => {
                            return <Items data={movie} key={i} give={this.handleClick}/>
                        })}
                </div>
            </div>
        )
    }

    handleClick = (data) => {
        this
            .props
            .give(data)
    }
}

class Items extends React.Component {
    handleClick = () => {
        this
            .props
            .give(this.props.data)
    }
    render() {
        const data = this.props.data
        return (
            <div className='recommendation' onClick={this.handleClick}>
                <img src={`https://image.tmdb.org/t/p/w185${data.poster}`} alt=""/>
                <div className='infos-container'>
                    <div className='center-children infos-date'>{`${data.month} ${data.day} ${data.year}`}</div>
                    <div className='center-children infos-title'>{data.title}</div>
                    <div className='center-children infos-vote'>
                        <span className='far fa-star'></span>
                        <span>{data.vote}</span>
                    </div>
                </div>
            </div>
        )
    }
}