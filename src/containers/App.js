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
            
            const data = {
              day: today,
              dayTemp: (responce.data.list[0].temp.day-273.15).toFixed(),
              nightTemp: (responce.data.list[0].temp.night-273.15).toFixed(),
              condition: responce.data.list[0].weather[0].description,
              icon : 'http://openweathermap.org/img/w/' + responce.data.list[0].weather[0].icon + '.png'

            };
            this.setState({
              city: responce.data.city.name,
              weekDays: [...updatedWeekDays],
              weatherData: responce.data.list,
              selectedDay: {
                day: data.day,
                dayTemp: data.dayTemp,
                nightTemp: data.nightTemp,
                condition: data.condition,
                icon: data.icon
              }
            });
          });
      });
    }
  }

  switchDayHandler( day, dayTemp, nightTemp, condition, icon) {
    
    this.setState({
      
      selectedDay: {
        day: day,
        dayTemp: dayTemp,
        nightTemp: nightTemp,
        condition: condition,
        icon: icon
        
      }
      
    });
    
  }

  render() {
    const weatherBoxes = this.state.weatherData.map((el, index) => {
      const key=el.dt;
      const day=this.state.weekDays[index];
      const dayTemp=(el.temp.day-273.15).toFixed();
      const nightTemp=(el.temp.night-273.15).toFixed();
      const condition=el.weather[0].description;
      const icon='http://openweathermap.org/img/w/' + el.weather[0].icon + '.png';
      
      

      return (
        <WeatherBox
          key={key}
          day={day}
          dayTemp={dayTemp}
          nightTemp={nightTemp}
          condition={condition}
          icon={icon}
          clicked={()=> this.switchDayHandler( day, dayTemp, nightTemp, condition, icon)} 
          
        />);
    });

    return (
      <div className="App">
        <h1 id='title'>Weather App</h1>
        <CityInfo
          city={this.state.city}
          day={this.state.selectedDay.day}
          condition={this.state.selectedDay.condition}

        />
        <WeatherInfo
          dayTemp={this.state.selectedDay.dayTemp}
          nightTemp={this.state.selectedDay.nightTemp}
          icon={this.state.selectedDay.icon} />
        {weatherBoxes}
      </div>
    );
  }
}

export default App;
