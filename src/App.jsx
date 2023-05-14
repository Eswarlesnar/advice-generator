import { useEffect  , useState} from 'react'
import axios from 'axios'
import diceImage from "./assets/images/icon-dice.svg"
import './App.css'

function App() {
  const [quote , setQuote] = useState("")
  const [error , setError] = useState("")
  const [loading , setLoading] = useState(false)


  const callApi = async () => {
     try{ 
      setLoading(true)
      const {data} = await axios.get("https://api.adviceslip.com/advice")
      setQuote(data.slip)
     
      setLoading(false)
     }catch(err){
      setError(err.message)
      setLoading(false)
     }
  }

  useEffect(()=>{
    callApi()
  }, [])

  return (
    <div className='container'> 
       <div className='card'>
         {
           loading ? <p className='loading'>Loading ...</p> : (<>
            <div className='content'>
              <p className='advice-number'>advice #{quote.id}</p>
              <p className='advice'>
                "{quote.advice}"
              </p>
              <div className='divider'>
                
              </div>
            </div>
            <button className="next-advice" onClick={callApi}>
              <img src= {diceImage} />
            </button>
          </>)
         }
       </div>
       
    </div>
  )
}

export default App
