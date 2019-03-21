import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CityInfo from '../components/cityInfo/CityInfo';
import WeatherInfo from '../components/weatherInfo/WeatherInfo';






class App extends Component {
  state = {
    city: '',
    weatherData: [],
    allDays: [],
    selectedDay: {
      day: 'today',
      dayTemp: '',
      nightTemp: '',
      icon: ''
    }
  }

  componentDidMount() {


    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let date = new Date();
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const today = weekDays[date.getDay()];


        axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + long + '&cnt=10&appid=739cdfd8b96a050e66e43dd1497f899b')
          .then((responce) => {

            this.setState({
              city: responce.data.city.name,
              weatherData: responce.data,


            });
          });
      });

    }









  }

  render() {
    return (
      <div className="App">
        <CityInfo
          city={this.state.city}
          day={this.state.selectedDay.day}

        />
        <WeatherInfo />
      </div>
    );
  }
}

export default App;
