import React from 'react'

export default class Footer extends React.Component {
    render() {
        return (
            <div className='footer relative center-children'>
                <div className='scroll-top' onClick={this.handleClick}>
                    <span className="fas fa-arrow-up"></span>
                </div>
                <div className='title'>Designed and developed by 
                    <a href='https://www.tristan-lanoye.com' className="portfolio-link" target='blank'>Tristan Lanoye</a>
                </div>
                <a href='https://github.com/tristan-lanoye/react-moviedb' target='blank'>
                    <span>View code on Github</span>
                </a>
                <span className='fab fa-github'></span>
            </div>
        )
    }

    handleClick = () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }
}