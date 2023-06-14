import React, {useState ,useEffect} from 'react'
import axios from 'axios'

function App() {

  const [data , setData] = useState()
  const [location , setLocation] = useState('')
  
  //const url = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=4b8595b8ddd8f17138c4dbfdf58c740b'

  const q1=  'https://api.openweathermap.org/data/2.5/weather?q='

  const q2= '&appid=4b8595b8ddd8f17138c4dbfdf58c740b'

  const searchLocation = (event) =>{
    if (event.key === 'Enter'){
      console.log(event.target.value)

      const url = q1 + event.target.value + q2

      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
    }
  }
  // useEffect(() => {
  //   const temp = q1 + "indore" + q2
  //   axios.get(temp).then((res) => {
  //     setData(res.data)
  //     // .catch((err) => {
  //     //   console.log(err)
  //     // })
  //   })
  // }, [])

  useEffect(() => {
    const init = async() => {
      const temp = q1 + 'indore' + q2
      const res = await axios.get(temp)
      setData(res.data)
      console.log(res.data.main.temp)
    }
    init()
  }, [])

  return (
    <div className='app'>
 
      <div className="search">
        <input 
        value={location}
        onChange={event=> setLocation(event.target.value)}
        onKeyPress = {searchLocation}
        type="text" 
        placeholder='Enter location'
        />
      </div>

      {data && <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          {console.log(data)}

          <div className="temp">
            <h1>{data.main.temp}°F</h1>
          </div>

          <div className="discription">
            <p>{data.weather[0].main}</p>
          </div>
        </div>

          <div className="bottom">
            <div className="feels">
              <p className='bold'>{data.main.temp}°F</p>
              <p>Feels like</p>
            </div>

            <div className="humidity">
              <p className='bold'>{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
              
            <div className="wind">
              <p className='bold'>{data.wind.speed} MPH</p>
              <p>Winds</p>
            </div>
          </div>
      </div>}
    </div>
  )
}

export default App
