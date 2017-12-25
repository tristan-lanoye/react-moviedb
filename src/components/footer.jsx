import React from 'react' 

export default class Footer extends React.Component {
    render() {
        return ( 
            <div className='footer relative center-children'>
                <a href='https://github.com/tristan-lanoye/react-moviedb' target='blank'> <span>View code on Github</span> <span className='fab fa-github'></span></a>
            </div>
        )
    }
}