import React from 'react'
import './Loader.css'


const Loader = () => {
    return (
        <div className='loadingCenter'>
            <div className="animateContainer">
                <div className="circleCell" />
                <div className="circleCell" />
                <div className="circleCell" />
            </div>
        </div>
    )
}

export default Loader