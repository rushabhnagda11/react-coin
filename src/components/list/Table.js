import React from 'react'
import './Table.css'
import {withRouter} from 'react-router-dom'
import {renderPercentChange} from '../../helper'

const Table = (props) => {
    const {currencies, history} = props
    return (
        <div className="Table-container">
        <table className='Table'>
        <thead className='Table-head'>
            <tr>
                <th>Cryptocurrency</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>24H Change</th>

            </tr>
        </thead>
        <tbody className='Table-body'>
        {currencies.map(c => (
            <tr key={c.id} onClick={() => {history.push(`/currency/${c.id}`)}}>
                <td>
                    <span className="Table-rank">{c.rank}</span>
                    {c.name}
                </td>
                <td>
                    <span className="Table-dollar">$</span>
                    {c.price}
                </td>
                <td>
                    <span className="Table-dollar">$</span>
                    {c.marketCap}
                </td>
                <td>
                    {renderPercentChange(c.percentChange24h)}
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    )
}

export default withRouter(Table)