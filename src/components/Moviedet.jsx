import React from 'react'

export default class MovieDet extends React.Component {
    render() {
        const data = this.props.data
        return (
            <div className='grid-details'>
                <span className='title'>Details</span>
                <div className='detail-container'>
                    <span className='detail-title'>Status</span>
                    <span className='detail-value'>{data.status}</span>
                </div>
                <div className='detail-container'>
                    <span className='detail-title'>Original Title</span>
                    <span className='detail-value'>{data.originalTitle}</span>
                </div>
                <div className='detail-container'>
                    <span className='detail-title'>Original Language</span>
                    <span className='detail-value upper'>{data.language}</span>
                </div>
                <div className='detail-container'>
                    <span className='detail-title'>Budget</span>
                    <span className='detail-value'>$ {data.budget}</span>
                </div>
                <div className='detail-container'>
                    <span className='detail-title'>Revenue</span>
                    <span className='detail-value'>$ {data.revenue}</span>
                </div>
                <div className='detail-container'>
                    <span className='detail-title'>Production Companies</span>
                    {data
                        .productionCompanies
                        .map((company, i) => <span className='detail-value' key={i}>{i + 1 == data.productionCompanies.length
                                ? `${company}`
                                : `${company}, `}</span>)}
                </div>
                <div className='detail-container'>
                    <span className='detail-title'>Production Countries</span>
                    {data
                        .productionCountries
                        .map((country, i) => <span className='detail-value' key={i}>{i + 1 == data.productionCountries.length
                                ? `${country}`
                                : `${country}, `}</span>)}
                </div>
                <div className='detail-container'>
                    <span className='detail-title'>Vote Average</span>
                    <span className='detail-value'>{data.vote}</span>
                </div>
                <div className='detail-container'>
                    <span className='detail-title'>Vote Count</span>
                    <span className='detail-value'>{data.voteCount}</span>
                </div>
                <div className='detail-container'>
                    <span className='detail-title'>-18</span>
                    <span className='detail-value'>{data.adult
                            ? 'Yes'
                            : 'No'}</span>
                </div>
            </div>
        )
    }
}