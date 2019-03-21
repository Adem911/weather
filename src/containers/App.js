import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CityInfo from '../components/cityInfo/CityInfo';
import WeatherInfo from '../components/weatherInfo/WeatherInfo';
import WeatherBox from '../components/weatherBox/WeatherBox';






class App extends Component {
  state = {
    city: '',
    weatherData: [],
    weekDays: [],
    selectedDay: {
      day: '',
      dayTemp: '',
      nightTemp: '',
      icon: '',
      condition: ''
    }
  }

  componentDidMount() {


    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let date = new Date();
        let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const today = weekDays[date.getDay()];
        const one = weekDays.splice(0, weekDays.indexOf(today));
        const two = weekDays.splice(weekDays.indexOf(today), weekDays.length);
        const updatedWeekDays = [...two, ...one];



        axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + long + '&cnt=7&appid=739cdfd8b96a050e66e43dd1497f899b')
          .then((responce) => {
            this.setState({
              city: responce.data.city.name,
              weekDays: [...updatedWeekDays],
              weatherData: responce.data.list,
              selectedDay: {
                day: today,
                dayTemp: responce.data.list[0].temp.day,
                nightTemp: responce.data.list[0].temp.night
              }


            });
          });
      });

    }









  }

  render() {
    const weatherBoxes = this.state.weatherData.map((el, index) => {
      return (
        <WeatherBox 
        key={el.dt}
        day={this.state.weekDays[index]}
        dayTemp={el.temp.day}
        nightTemp={el.temp.night}
        condition={el.weather.description}
        />);
    });

    return (
      <div className="App">
        <CityInfo
          city={this.state.city}
          day={this.state.selectedDay.day}

        />
        <WeatherInfo
          dayTemp={this.state.selectedDay.dayTemp} />
        {weatherBoxes}
      </div>
    );
  }
}

export default App;
