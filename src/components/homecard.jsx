import React from 'react'
import Moviecard from './moviecard.jsx'

export default class Homecard extends React.Component {
    render() {
        const data = this.props.data.display
        let poster = 'https://image.tmdb.org/t/p/w500'
        return (
            <div className='grid-home'>
                {data.map((movie, i) => {
                    return <Items key={i} data={movie} poster={poster} give={this.handleClick}/>
                })}
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
            <div className='movie-container relative' onClick={this.handleClick}>
                <img src={this.props.poster + data.poster} alt='movie-poster'/>
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