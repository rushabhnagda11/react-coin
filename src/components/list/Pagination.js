import React from 'react'
import './Pagination.css'
import PropTypes from 'prop-types'

const Pagination = (props) => {
    const {page, totalPages, handlePageClick} = props
    return (
        <div className='Pagination'>
           <button className='Pagination-button' onClick={() => handlePageClick('prev')} disabled={page<=1}>&larr;</button>
           <span> <b>{page} </b> of <b>{totalPages} </b> </span>
           <button className='Pagination-button' onClick={() => handlePageClick('next')} disabled={page>=totalPages}>&rarr;</button> 
        </div>
    )
}

Pagination.propTypes = {
    page : PropTypes.number.isRequired
}

export default Pagination