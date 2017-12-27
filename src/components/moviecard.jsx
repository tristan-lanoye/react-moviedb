import React from 'react'
import MovieRec from './Movierec.jsx'
import MovieDet from './Moviedet.jsx'
import MovieInf from './Movieinf.jsx'
import MoviePho from './Moviepho.jsx'

const html = document.querySelector('html')
const nullw500 = require('../images/nullw500.png');

export default class Moviecard extends React.Component {
    render() {
        const data = this.props.data
        if (data.backdrop != null) {
            html.style.background = `url(https://image.tmdb.org/t/p/w1280${data.backdrop}) center center / cover no-repeat fixed`
            html.style.minHeight = '100%'
        } else {
            html.style.background = 'rgb(34,34,34)'
        }
        return (
            <div className='grid-movie'>
                <div className='movie-poster relative'>
                    <img src={data.poster == null ? `${nullw500}` : `https://image.tmdb.org/t/p/w500${data.poster}`} alt=""/>
                </div>
                <MovieInf data={data} handleClick={this.handleScrollDetails}/>
                {data.recommendations != '' && <MovieRec data={data} give={this.handleClick}/>}
                <MoviePho data={data}/>
                <MovieDet data={data} handleClick={this.handleScrollTop}/>
            </div>
        )
    }
    handleScrollDetails = () => {
        document.querySelector('.grid-photos').scrollIntoView({behavior: 'smooth'});
    }
    handleClick = (data) => {
        this.props.give(data)
    }
}
