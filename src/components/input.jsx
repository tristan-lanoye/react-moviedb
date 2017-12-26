import React from 'react'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'
import Homecard from './homecard.jsx'
import Moviecard from './moviecard.jsx'
import Footer from './footer.jsx'

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

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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
            upcoming: false,
            menu: false
        }
    }

    render() {
        console.log('render')
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
        const home = classNames({'header-home': true, 'center-children': true, 'relative': true, 'active': this.state.homepage})
        const popular = classNames({
            'header-popular': true,
            'header-category': true,
            'center-children': true,
            'relative': true,
            'active': this.state.homepage && this.state.popular
        })
        const top = classNames({
            'header-top': true,
            'header-category': true,
            'center-children': true,
            'relative': true,
            'active': this.state.homepage && this.state.top
        })
        const upcoming = classNames({
            'header-upcoming': true,
            'header-category': true,
            'center-children': true,
            'relative': true,
            'active': this.state.homepage && this.state.upcoming
        })
        const menu = classNames({'menu': true, 'active': this.state.menu})
        const github = classNames({'header-github': true, 'center-children': true, 'relative': true})
        return (
            <div className='whatever' onClick={this.handleClickWindow}>
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
                        <div className='header-menu relative' onClick={this.handleClickMenu}>
                            <span className='fas fa-bars'></span>
                            <div className={menu}>
                                <div className={home} onClick={this.handleClickHome}>
                                    <span className='fas fa-home'></span>
                                </div>
                                <div className={popular} onClick={this.handleClickPopular}> <span>Popular</span> </div>
                                <div className={top} onClick={this.handleClickTop}> <span>Top Rated</span> </div>
                                <div className={upcoming} onClick={this.handleClickUpcoming}> <span>Upcoming</span> </div>
                                <a
                                    className={github}
                                    href='https://github.com/tristan-lanoye/react-moviedb'
                                    target='blank'
                                    title='View code on github'>
                                    <span className='fab fa-github'></span>
                                </a>
                            </div>
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
                        <div className={github}>
                            <a
                                href='https://github.com/tristan-lanoye/react-moviedb'
                                target='blank'
                                title='View code on github'>
                                <span className='fab fa-github'></span>
                            </a>
                        </div>
                    </div>
                </div>
                {this.state.homepage
                    ? <Homecard data={this.state} give={this.handleChildClick}/>
                    : <Moviecard data={this.state} give={this.handleChildClick}/>}
            </div>
        )
    }

    componentDidMount() {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2017&vote_count.gte=500`
        this.fetchCategories(url, 'popular')
    }

    handleClickMenu = (e) => {
        this.setState({
            menu: !this.state.menu
        })
    }

    handleClickWindow = (e) => {
        const headerMenu = document.querySelector('.header-menu')
        const menu = document.querySelector('.menu')
        if (this.state.menu) {
            if (e.clientX > headerMenu.getBoundingClientRect().left && e.clientX < headerMenu.getBoundingClientRect().left + headerMenu.getBoundingClientRect().width && e.clientY > headerMenu.getBoundingClientRect().top && e.clientY < headerMenu.getBoundingClientRect().top + headerMenu.getBoundingClientRect().height) {
                return
            } else {
                this.setState({menu: false})
            }
        }
    }

    handleChildClick = (data) => {
        const url = `https://api.themoviedb.org/3/movie/${data.id}?api_key=36aa851f78a4635a5a8c775eefe9ffe9&append_to_response=credits,recommendations`
        this.fetchMovie(url)
    }

    handleClickHome = () => {
        if (!this.state.homepage) {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2017&vote_count.gte=500`
            this.fetchCategories(url, 'popular')
        }
    }
    handleClickPopular = () => {
        if (!this.state.popular) {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2017&vote_count.gte=500`
            this.fetchCategories(url, 'popular')
        }
    }
    handleClickTop = () => {
        if (!this.state.top) {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1500`
            this.fetchCategories(url, 'top')
        }
    }
    handleClickUpcoming = () => {
        if (!this.state.upcoming) {
            const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=36aa851f78a4635a5a8c775eefe9ffe9&language=en-US&page=1`
            this.fetchCategories(url, 'upcoming')
        }
    }

    fetchCategories = (url, category) => {
        let results = [],
            random = randomNumber(0, 19)
        fetch(url).then((res) => res.json()).then((data) => {
            data
                .results
                .map((movie) => {
                    let tempReleaseDate = '',
                        tempDate = [],
                        tempDateString = ''
                    tempReleaseDate = movie.release_date
                    tempReleaseDate += '-'
                    for (let i = 0; i < tempReleaseDate.length; i++) {
                        if (tempReleaseDate[i] != '-') {
                            tempDateString += tempReleaseDate[i]
                        } else {
                            tempDate.push(tempDateString)
                            tempDateString = ''
                        }
                    }
                    results.push({
                        id: movie.id,
                        title: movie.title,
                        year: `${tempDate[0]}`,
                        month: `${tempDate[1]}`,
                        day: `${tempDate[2]}`,
                        vote: movie.vote_average,
                        poster: movie.poster_path,
                        backdrop: movie.backdrop_path
                    })
                })
            html.style.background = `url('https://image.tmdb.org/t/p/w1280${results[random].backdrop}') center center / cover no-repeat fixed`
            html.style.minHeight = '100%'
            if (category === 'popular') {
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
            if (category === 'top') {
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
            if (category === 'upcoming') {
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
                temp.push({title: res.title, id: res.id, date: res.release_date, vote: res.vote_average, poster: res.poster_path})
            }
            this.setState({suggestions: temp})
        }).catch((err) => console.log('Query did not match any movie'))
    }

    fetchMovie = (url) => {
        let tempGenres = [],
            tempMainActors = [],
            tempActors = [],
            tempCrew = [],
            tempRecommendations = [],
            tempDirector = {},
            tempReleaseDate = '',
            tempDate = [],
            tempDateString = ''
        fetch(url).then((res) => res.json()).then((data) => {
            tempReleaseDate = data.release_date
            tempReleaseDate += '-'
            for (let i = 0; i < tempReleaseDate.length; i++) {
                if (tempReleaseDate[i] != '-') {
                    tempDateString += tempReleaseDate[i]
                } else {
                    tempDate.push(tempDateString)
                    tempDateString = ''
                }
            }
            data
                .genres
                .map(genre => tempGenres.push(genre.name))
            data
                .credits
                .cast
                .map((actor, i) => {
                    tempActors.push({character: actor.character, name: actor.name, photo: actor.profile_path})
                    if (i < 4) {
                        tempMainActors.push({character: data.credits.cast[i].character, name: data.credits.cast[i].name, photo: data.credits.cast[i].profile_path})
                    }
                })
            data
                .credits
                .crew
                .map((crew, i) => {
                    tempCrew.push({name: crew.name, job: crew.job, department: crew.department, photo: crew.profile_path})
                    if (tempDirector.name == undefined && crew.job == 'Director') {
                        tempDirector = {
                            name: data.credits.crew[i].name,
                            job: data.credits.crew[i].job,
                            photo: data.credits.crew[i].profile_path
                        }
                    }
                })
            data
                .recommendations
                .results
                .map((movie, i) => {
                    let newReleaseDate = '',
                        newDate = [],
                        newDateString = ''
                    newReleaseDate = movie.release_date
                    newReleaseDate += '-'
                    if (i < 6) {
                        for (let i = 0; i < newReleaseDate.length; i++) {
                            if (newReleaseDate[i] != '-') {
                                newDateString += newReleaseDate[i]
                            } else {
                                newDate.push(newDateString)
                                newDateString = ''
                            }
                        }
                        tempRecommendations.push({
                            id: movie.id,
                            title: movie.title,
                            year: `${newDate[0]}`,
                            month: `${newDate[1]}`,
                            day: `${newDate[2]}`,
                            vote: movie.vote_average,
                            poster: movie.poster_path
                        })
                    } else {
                        return
                    }
                })
            this.setState({
                homepage: false,
                popular: false,
                top: false,
                upcoming: false,
                display: [],
                movieID: data.id,
                title: data.title,
                originalTitle: data.original_title,
                director: tempDirector,
                mainActors: tempMainActors,
                actors: tempActors,
                crew: tempCrew,
                recommendations: tempRecommendations,
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
        }).catch((err) => console.log('Movie not found'))
    }

    onSuggestionsFetchRequested = ({value}) => {
        if (value.length > 3 && value.length < 15) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=36aa851f78a4635a5a8c775eefe9ffe9&query=${value}`
            this.fetchSuggestions(url)
        }
    }

    onSuggestionSelected = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
        const url = `https://api.themoviedb.org/3/movie/${suggestion.id}?api_key=36aa851f78a4635a5a8c775eefe9ffe9&append_to_response=credits,recommendations`
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
        for (let i = 0; i < 4; i++) {
            temp += suggestion.date[i]
        }
        let poster = 'https://image.tmdb.org/t/p/w92'
        return (
            <div className='box-suggestion'>
                {suggestion.poster != null && <img src={poster + suggestion.poster} alt="" className='box-image'/>}
                <div className='box-title'>
                    <span>
                        {suggestion.title}
                    </span>
                    <span className='box-date'>
                        {temp}
                    </span>
                </div>
                <div className='box-vote'>
                    <span className='far fa-star'></span>{suggestion.vote}</div>
            </div>
        )
    }
}