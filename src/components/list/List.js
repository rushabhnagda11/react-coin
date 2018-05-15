import React from 'react'
import {API_URL} from '../../config'
import {handleResponse} from '../../helper'
import Loading from '../common/Loading'
import Table from './Table'
import Pagination from './Pagination'

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading : false,
            currencies : [],
            error : null,
            page : 1,
            totalPages:0
        }

        this.handlePageClick = this.handlePageClick.bind(this)
    }

    componentDidMount() {
        this.fetchCurrencies()
    }

    handlePageClick(direction) {
        let nextPage = this.state.page
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1
        this.setState({page : nextPage}, () => this.fetchCurrencies())
    }

    fetchCurrencies() {
        this.setState({loading : true})
        fetch(`${API_URL}/coins/v1/cryptocurrencies?page=${this.state.page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            const {currencies, page, totalPages} = data
            this.setState({currencies, page, totalPages, loading : false})
        })
        .catch((error) => {
            this.setState({error : error.errorMessage})
        });
    }
    
    render() {
        const {loading, currencies, error, page, totalPages} = this.state
        console.log(this.state)
        
        if(loading) {
            return <div className='loading-container'><Loading/></div>
        }

        if(error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table currencies={currencies}/>
                <Pagination page={page} totalPages={totalPages} handlePageClick={this.handlePageClick}/>
            </div>
        )
    }
}

export default List