import React from 'react'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames' 
import Homecard from './homecard.jsx'
import Moviecard from './moviecard.jsx'

const html = document.querySelector('html')
const months = [
    'January', 
    'February',
    'March', 
    'April', 
    'May', 
    'June',
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December' 
]

export default class Input extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            movieID: 244786,
            value: '',
            suggestions: [],
            display: [], 
            homepage: true,
            popular: true, 
            top: false, 
            upcoming: false 
        }
    }

    render() {
        const {value, suggestions} = this.state
        const logo = 'https://www.themoviedb.org/assets/static_cache/27b65cb40d26f78354a4ac5abf87b2be/' +
                'images/v4/logos/powered-by-rectangle-green.svg'
        const autoFocus = 'autofocus'
        const inputProps = {
            placeholder: "Search movie ...",
            value,
            onChange: this.onChange,
            autoFocus
        }
        const home = classNames({
            'header-home': true, 
            'center-children': true,
            'relative': true, 
            'active': this.state.homepage, 
        })
        const popular = classNames({
            'header-popular': true, 
            'center-children': true,
            'relative': true, 
            'active': this.state.homepage && this.state.popular, 
        })
        const top = classNames({
            'header-top': true, 
            'center-children': true,
            'relative': true, 
            'active': this.state.homepage && this.state.top, 
        })
        const upcoming = classNames({
            'header-upcoming': true, 
            'center-children': true,
            'relative': true, 
            'active': this.state.homepage && this.state.upcoming, 
        })
        return (
            <div className='whatever'>
            <div className='header'>
                <div className='grid-input'>
                    <div className='header-logo relative'><img src={logo} alt="TMDB"/></div>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}/>
                    <div className='header-menu relative'>
                        <span className='fas fa-bars'></span>
                    </div>
                </div>
                <div className='grid-categories'>
                    <div className={home} onClick={this.handleClickHome}>
                        <span className='fas fa-home'></span>
                    </div>
                    <div className={popular} onClick={this.handleClickPopular}>
                        <span>popular today</span>
                    </div>
                    <div className={top} onClick={this.handleClickTop}>
                        <span>top rated</span>
                    </div>
                    <div className={upcoming} onClick={this.handleClickUpcoming}>
                        <span>upcoming</span>
                    </div>
                </div>
            </div>
                {this.state.homepage ? <Homecard data={this.state} give={this.handleHomecardClick}/> : <Moviecard data={this.state}/>}
            </div>
        )
    }

    componentDidMount() {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2017&vote_count.gte=500`
        this.fetchCategories(url, 'popular') 
    }

    handleHomecardClick = (data) => {
        const url = `https://api.themoviedb.org/3/movie/${data.id}?api_key=36aa851f78a4635a5a8c775eefe9ffe9&append_to_response=credits`
        this.fetchMovie(url) 
    }

    handleClickHome = () => {
        if(!this.state.homepage) {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2017&vote_count.gte=500`
            this.fetchCategories(url, 'popular') 
        }
    }
    handleClickPopular = () => {
        if(!this.state.popular) {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2017&vote_count.gte=500`
            this.fetchCategories(url, 'popular') 
        }
    }
    handleClickTop = () => {
        if(!this.state.top) {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1500`
            this.fetchCategories(url, 'top') 
        }
    }
    handleClickUpcoming = () => {
        if(!this.state.upcoming) {
            const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&page=1`
            this.fetchCategories(url, 'upcoming') 
        }
    }

    fetchCategories = (url, category) => {
        fetch(url).then((res) => res.json()).then((data) => {
            let results = []
            data.results.map((movie) => {
                results.push({id: movie.id, title: movie.title, date: movie.release_date, vote: movie.vote_average, poster: movie.poster_path, backdrop: movie.backdrop_path})
            })
            html.style.background = `url('https://image.tmdb.org/t/p/original${results[0].backdrop}') center center / cover no-repeat fixed`
            if(category === 'popular') {
                this.setState({
                    movieID: undefined,
                    value: '',
                    suggestions: [],
                    homepage: true,   
                    popular: true, 
                    top: false,
                    upcoming: false,              
                    display: results
                })
            }
            if(category === 'top') {
                    this.setState({
                        movieID: undefined,
                        value: '',
                        suggestions: [],
                        homepage: true,   
                        popular: false, 
                        top: true,
                        upcoming: false,             
                        display: results
                    })  
                }
            if(category === 'upcoming') {
                this.setState({
                    movieID: undefined,
                    value: '',
                    suggestions: [],
                    homepage: true,   
                    popular: false, 
                    top: false,
                    upcoming: true,            
                    display: results
                })
            }
        }).catch((err) => console.log('Something happened'))
    }

    fetchSuggestions = (url) => {
        fetch(url).then((res) => res.json()).then((data) => {
            let temp = []
            console.log(data)
            for (let i = 0; i < 5; i++) {
                const res = data.results[i]
                temp.push({title: res.title, id: res.id, date: res.release_date, vote: res.vote_average})
            }
            this.setState({suggestions: temp})
        }).catch((err) => console.log('Query did not match any movie'))
    }

    fetchMovie = (url) => {
        let tempGenres = [],
            tempActors = [],
            tempReleaseDate = '', 
            tempDate = [],
            tempDateString = '' 
        fetch(url).then((res) => res.json()).then((data) => {
            console.log(data)
            data.genres.map(genre => tempGenres.push(genre.name))
            tempReleaseDate = data.release_date
            tempReleaseDate += '-'
            for(let i = 0; i < tempReleaseDate.length; i++) {
                if(tempReleaseDate[i] != '-') {
                    tempDateString += tempReleaseDate[i]
                } else {
                    tempDate.push(tempDateString)
                    tempDateString = '' 
                }
            }
            console.log(tempDate)
            this.setState({
                homepage: false,
                popular: false, 
                top: false, 
                upcoming: false,
                display: [], 
                movieID: data.id,
                title: data.title,
                originalTitle: data.original_title,
                date: `${months[parseInt(tempDate[1]) - 1]} ${tempDate[2]}, ${tempDate[0]}`,
                tagline: data.tagline,
                overview: data.overview,
                budget: data.budget,
                revenue: data.revenue,
                runtime: data.runtime,
                adult: data.adult,
                vote: data.vote_average,
                posterPath: data.poster_path,
                backdropPath: data.backdrop_path,
                genres: tempGenres
            })
            console.log(this.state)
        }).catch((err) => console.log('Movie not found'))
    }

    onSuggestionsFetchRequested = ({value}) => {
        if (value.length > 3 && value.length < 15) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&query=${value}`
            this.fetchSuggestions(url)
        }
    }

    onSuggestionSelected = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
        const url = `https://api.themoviedb.org/3/movie/${suggestion.id}?api_key=36aa851f78a4635a5a8c775eefe9ffe9&append_to_response=credits`
        this.fetchMovie(url)
    }

    onChange = (event, {newValue, method}) => {
        this.setState({value: newValue})
    }

    onSuggestionsClearRequested = () => {
        this.setState({suggestions: []})
    }

    getSuggestionValue = (suggestion) => {
        return suggestion.title
    }

    renderSuggestion = (suggestion) => {
        let temp = '' 
        for(let i = 0; i < 4; i++) {
            temp += suggestion.date[i] 
        }
        return (
            <div>
                <div>{suggestion.title} ({temp})</div>
                <div>{suggestion.vote}</div>
            </div>
        )
    }
}