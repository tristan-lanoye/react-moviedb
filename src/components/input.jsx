import React from 'react'
import Autosuggest from 'react-autosuggest'
import Moviecard from './display.jsx'

export default class Input extends React.Component {
    constructor() {
        super()

        this.state = {
            movieID: 244786,
            value: '',
            suggestions: [],
            homepage: true
        }
    }

    render() {
        const {value, suggestions} = this.state
        const logo = 'https://www.themoviedb.org/assets/static_cache/27b65cb40d26f78354a4ac5abf87b2be/' +
                'images/v4/logos/powered-by-rectangle-green.svg'
        let currentClass = ''
        const autoFocus = 'autofocus'
        this.state.homepage
            ? currentClass = 'grid-homepage'
            : currentClass = 'grid-movie'
        const inputProps = {
            placeholder: "Search movie ...",
            value,
            onChange: this.onChange,
            autoFocus
        }
        return (
            <div className='whatever'>
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
                    <div className='header-home center-children relative'>
                        <span className='fas fa-home'></span>
                    </div>
                    <div className='header-popular center-children relative'>
                        <span>popular today</span>
                    </div>
                    <div className='header-top center-children relative'>
                        <span>top rated</span>
                    </div>
                    <div className='header-view center-children relative'>
                        <span>most viewed</span>
                    </div>
                </div>
                {!this.state.homepage && <Moviecard data={this.state}/>}
            </div>
        )
    }

    componentDidMount() {}

    suggestionsFetchApi = (url) => {
        fetch(url).then((res) => res.json()).then((data) => {
            let temp = []
            for (let i = 0; i < 5; i++) {
                temp.push({title: data.results[i].title, id: data.results[i].id})
            }
            this.setState({suggestions: temp})
        }).catch((err) => console.log('Movie not found'))
    }

    movieFetchApi = (url) => {
        fetch(url).then((res) => res.json()).then((data) => {
            console.log(data)
            let tempGenres = [],
                tempActors = []
            data
                .genres
                .map(item => tempGenres.push(item))
            this.setState({
                homepage: false,
                movieID: data.id,
                title: data.title,
                originalTitle: data.original_title,
                date: data.release_date,
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
        }).catch((err) => console.log('Movie not found!'))
    }

    onSuggestionsFetchRequested = ({value}) => {
        if (value.length > 2 && value.length < 15) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&query=${value}&language=en&page=1`
            this.suggestionsFetchApi(url)
        }
    }

    onSuggestionSelected = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
        const url = ` https://api.themoviedb.org/3/movie/${suggestion.id}?api_key=36aa851f78a4635a5a8c775eefe9ffe9`
        this.movieFetchApi(url)
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
        return (
            <span>{suggestion.title}</span>
        )
    }
}