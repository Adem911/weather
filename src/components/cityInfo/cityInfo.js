import React from 'react';
import './CityInfo.css';

const CityInfo = (props) =>{
    return (
        <div className='cityInfo'>
            <h1>{props.city}</h1>
            <h3>{props.day}</h3>
            <h3>weather condition</h3>
        </div>
    );
};

export default CityInfo;