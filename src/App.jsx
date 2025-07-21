import { useState,useEffect,useRef,useCallback } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [password,setPassword] = useState("")
  const [charact,setCharact] = useState(false)
  const [numb,setNumb] = useState(false)
  const passwordRef = useRef(null)

  
  const passwordGenerator = useCallback(()=>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""
    
    if(numb) str+="0123456789";
    if(charact) str+="!@#$%^&*(){}[]";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass);
  },[length,charact,numb,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,charact,numb,setPassword])

const copyToclipboard =useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
},[password])


  return (
    <div className='m-8 p-8 border-white flex  justify-center border rounded-full'>
      <div className='border-white flex flex-col items-center justify-center'>
      
        <div>
          <h1 className='text-white text-3xl'>Password Generator</h1>
        </div>
        <div className='m-3 p-3'>
          <input 
          type="text"
          readOnly
          className='shadow-lg text-center text-orange-600 bg-white '
          placeholder='The password'
          ref={passwordRef}
          value={password}
          />
          <button onClick={copyToclipboard} className='text-white bg-blue-500 border rounded-r-lg pr-1'>Copy</button>
        </div>
        <div>
          <div className='flex flex-wrap items-center'>
            <input 
            type="range"
            min="8"
            max="100"
            value={length}
            onChange={(e)=>{
              setLength(e.target.value)
            }}
            
            className='text-white border'
            />
            <label className='text-white'>Length : {length}</label>


            <div className='p-2 flex gap-1'>
              <input 
              type="checkbox"
              defaultChecked = {numb}
              className='text-white border accent-orange-400'
              onChange={()=>{
                setNumb(prev =>(!prev));
              }}
              />
              <label className='text-white'>Number</label>
            </div>
          

            <div className='p-2 flex gap-1'>
              <input 
              type="checkbox"
              className='text-white border accent-orange-400'
              onChange={()=>{
                setCharact(prev=>(!prev));
              }}
              />
              <label className='text-white'>Character</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
