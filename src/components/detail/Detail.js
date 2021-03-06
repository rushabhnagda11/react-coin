import React from 'react'
import {API_URL} from '../../config'
import {handleResponse, renderPercentChange} from '../../helper'
import Loading from '../common/Loading'
import './Detail.css'

class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            loading : false,
            error : null,
            currency : {}
        }

        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        const currencyId = this.props.match.params.id
        this.setState({loading : true}, () => this.fetchData(currencyId))

    }

    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.id != nextProps.match.params.id) {
            this.fetchData(nextProps.match.params.id)
        }
    }

    fetchData(currencyId) {
        fetch(`${API_URL}/coins/v1/cryptocurrencies/${currencyId}`)
        .then(handleResponse)
        .then(data => {
            const currency = data
            this.setState({
                currency : data,
                error : null,
                loading : false
            })
        })
        .catch(error => {
            this.setState({
                error : error.errorMessage,
                loading : false
            })
        })
    }

    render() {
        const {loading, error, currency} = this.state
        if(loading) {
            return <div className='loading-container'><Loading /></div>
        }
        if(error) {
            return <div className='error'>{error}</div>
        }
        
        return (
            <div className="Detail">
                <h1 className="Detail-heading">
                    {currency.name} ({currency.symbol})
                </h1>
                <div className="Detail-container">
          <div className="Detail-item">
            Price <span className="Detail-value">$ {currency.price}</span>
          </div>
          <div className="Detail-item">
            Rank <span className="Detail-value">{currency.rank}</span>
          </div>
          <div className="Detail-item">
            24H Change
            <span className="Detail-value">{renderPercentChange(currency.percentChange24h)}</span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24H Volume</span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total supply</span>
            {currency.totalSupply}
          </div>
        </div>
      </div>
        )
        

    }
}

export default Detail