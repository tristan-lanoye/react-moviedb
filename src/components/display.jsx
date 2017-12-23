import React from 'react'
const html = document.querySelector('html')

export default class Moviecard extends React.Component {
    render() {
        const data = this.props.data
        const poster = `https://image.tmdb.org/t/p/original${data.posterPath}`
        const backdrop = `https://image.tmdb.org/t/p/original${data.backdropPath}`
        html.style.background = `url(${backdrop}) center center / cover no-repeat fixed`
        // console.log(data)
        return (
            <div className='grid-movie'>
                {/* <div className='movie-title relative'>
                    <span className='title'>{data.title}</span>
                    <span className='date'>({data.date})</span>
                </div>
                <div className='movie-tagline relative'>
                    <div className='tagline'>{data.tagline}</div>
                    <div className='overview'>{data.overview}</div>
                </div> */}
                {/* <img src={poster} className='movie-poster relative'/> { */}
                     {/* <img src={backdrop} className='movie-backdrop'/> } */}
            </div>
        )
    }

    componentDidMount() {}
}