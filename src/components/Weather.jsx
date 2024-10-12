import { useState } from 'react'
import axios from "axios"
import sun_cloud from '../assets/Screenshot 2024-01-08 165649.png'
import templogo from '../assets/Screenshot 2024-01-08 171202.png'
import windlogo from '../assets/Screenshot 2024-01-08 171701.png'


function Weather() {

    const [value, setValue] = useState("")
    const [weatherInfo, setWeatherInfo] = useState({})

    const api_key = "eb9c176eb91c1741edbdaa14d1504ac2"

    const fatchData = async (e) => {
        e.preventDefault()
        if (value === "") return 0
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${api_key}`);
        setWeatherInfo(res.data);
        setValue("")
    }

    const stateData = {
        temprature: weatherInfo.main ? (weatherInfo.main.temp - 273.15).toFixed(2) : "",
        wind: weatherInfo.wind ? weatherInfo.wind.speed : "",
        cloud: weatherInfo.clouds ? weatherInfo.weather[0].description : "",
        city: weatherInfo.name ? `Weather in ${weatherInfo.name} ` : "",
        country: weatherInfo.sys ? `(${weatherInfo.sys.country})` : ""
    }



    return (
        <>
            <form
                onSubmit={fatchData}
            >

                <div
                    className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
                    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1682685797365-41f45b562c0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D` }}
                >
                    <div
                        className=' flex-col flex content-center flex-wrap  rounded-2xl bg-opacity-10 backdrop-blur-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] bg-gray-500 w-1/2'
                    >
                        <p className=' text-4xl text-yellow-100 font-bold p-4 drop-shadow-2xl text-center'>
                            Weather App
                        </p>

                        <input
                            className={`text-center shadow-[inset_0px_0px_10px_-6px_#000] bg-transparent  outline-none p-2 rounded-lg text-white`}
                            placeholder='Enter your city name'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                            id="" />
                        <button
                            type='submit'
                            className=' bg-blue-500 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] m-auto my-4 rounded-xl p-2 font-bold w-40'>
                            Search weather
                        </button>
                        {weatherInfo && (

                            <div className=' flex flex-col justify-start'>
                                <h1 className=' text-yellow-100 p-2 m-auto align-middle'>{stateData ? `${stateData.city} ${stateData.country}` : ""}</h1>
                                <div className='flex flex-row items-center align-middle'>
                                    <img
                                        src={sun_cloud}
                                        className=' w-20 '
                                        alt="weather image" />
                                    <h1 className='text-yellow-100  text-3xl align-middle'>: {stateData.cloud ? stateData.cloud : " -- "}</h1>
                                </div>

                                <div className='flex flex-row items-center align-middle'>
                                    <img
                                        src={templogo}
                                        className=' p-2  w-20 '
                                        alt="weather image" />
                                    <h1 className=' text-yellow-100 text-3xl align-middle'>: {stateData.temprature ? stateData.temprature : " -- "} °C</h1>
                                </div>

                                <div className='flex flex-row items-center align-middle'>
                                    <img
                                        src={windlogo}
                                        className=' p-4 w-20 '
                                        alt="weather image" />
                                    <h1 className=' text-yellow-100 text-3xl align-middle'>: {stateData.wind ? stateData.wind : " -- "} km/h</h1>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </>
    )
}

export default Weather
