import React from 'react'
const nullw185 = require('../images/nullw185.png');

export default class MoviePho extends React.Component {
    render() {
        const data = this.props.data
        return (
            <div className='grid-photos'>
                <span className='title'>Cast and Crew</span>
                <div className='infos-container photo-director'>
                    <img src={data.director.photo == null ? `${nullw185}` : `https://image.tmdb.org/t/p/w185${data.director.photo}`} alt=""/>
                    <div className='infos-box'>
                        <div className='infos-one'>{data.director.job}</div>
                        <div className='infos-two'>{data.director.name}</div>
                        <div className='infos-three'>{data.director.job}</div>
                    </div>
                </div>
                {data
                    .actors
                    .map((actor, i) => {
                        return <Item data={actor} key={i}/>
                    })}
            </div>
        )
    }
}

class Item extends React.Component {
    render() {
        const data = this.props.data
        return (
            <div className='infos-container photo-actor'>
                <img src={data.photo == null ? `${nullw185}` : `https://image.tmdb.org/t/p/w185${data.photo}`} alt=""/>
                <div className='infos-box'>
                    <div className='infos-one'>{data.gender == 2
                            ? 'Actor'
                            : 'Actress'}</div>
                    <div className='infos-two'>{data.name}</div>
                    <div className='infos-three'>{data.character}</div>
                </div>
            </div>
        )
    }
}