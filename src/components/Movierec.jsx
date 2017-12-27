import React from 'react'
const nullw342 = require('../images/nullw342.png');

export default class MovieRec extends React.Component {
    render() {
        const data = this.props.data
        return (
            <div className='grid-recommendations'>
                <span className='title'>Recommendations</span>
                {data
                    .recommendations
                    .map((movie, i) => {
                        return <Item data={movie} key={i} give={this.props.give}/>
                    })}
            </div>
        )
    }
}

class Item extends React.Component {
    handleClick = () => {
        this
            .props
            .give(this.props.data)
    }
    render() {
        const data = this.props.data
        return (
            <div className='infos-container' onClick={this.handleClick}>
                <img src={data.poster == null ? `${nullw342}` : `https://image.tmdb.org/t/p/w342${data.poster}`} alt=""/>
                <div className='infos-box'>
                    <div className='infos-one'>{`${data.month} ${data.day} ${data.year}`}</div>
                    <div className='infos-two'>{data.title}</div>
                    <div className='infos-three'>
                        <span className='far fa-star'></span>
                        <span>{data.vote}</span>
                    </div>
                </div>
            </div>
        )
    }
}