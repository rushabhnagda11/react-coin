import React from 'react'
import './Search.css'
import {API_URL} from '../../config'
import {handleResponse} from '../../helper'
import search from './search.png'
import Loading from './Loading'
import {withRouter} from 'react-router-dom'

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            loading : false,
            searchQuery : '',
            searchResults : []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderSearchResults = this.renderSearchResults.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()

        const searchQuery = event.target.value;
        this.setState({loading : true, searchQuery : searchQuery})

        if(!searchQuery) {
            this.setState({searchResults : []})
            return '';
        }


        fetch(`${API_URL}/coins/v1/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then(searchResults => {
            this.setState({loading : false, searchResults})
        }).catch(error => {
            this.setState({loading : false})
        })


    }

    handleRedirect(id) {
        const {history} = this.props
        this.setState({
            searchQuery : '',
            searchResults : []
        })
        history.push(`/currency/${id}`)
    }

    renderSearchResults() {
        console.log(this.state)
        const {searchResults, searchQuery, loading} = this.state
        if(searchResults && searchResults.length > 0) {
            return (
                <div className="Search-result-container">
                    {searchResults.map(s => (
                        <div key={s.id} onClick={() => {this.handleRedirect(s.id)}} className="Search-result">
                            {s.name} ({s.symbol})
                        </div>
                    ))}
                </div> 
            )
        }

        if(!loading && searchQuery) {
            return <div className="Search-result-container">
                <div className="Search-no-result">
                    No results found
                </div>
            </div>
        }

        return ''
    }

    render() {
        const {loading, searchQuery} = this.state
        return (
            <div className="Search">
                <img alt="search icon" className="Search-icon"src={search}/>
                <input 
                    className="Search-input" 
                    name="searchQuery"
                    onChange={this.handleSubmit}
                    placeholder="Search currency"
                    value={searchQuery}
                />
                {loading && searchQuery && <div className="Search-loading"><Loading width="12px" height="12px" classname="loading-container"/></div>}
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search)