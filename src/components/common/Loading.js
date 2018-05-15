import React from 'react'
import './Loading.css'
const Loading = (props) => {
    const {width, height} = props
    return <div className='Loading' style={{height,width}}/>
}

Loading.defaultProps = {
    height : "28px",
    width : "28px"
}

export default Loading