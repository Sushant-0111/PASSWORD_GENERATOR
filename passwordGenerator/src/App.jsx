import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const[length, setLength] = useState(8)
  const[numAllowed, setNumAllowed] = useState(false)
  const[charAllow,setCharAllow] = useState(false)
  const[password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789"
    if(charAllow) str += "!@#$%&'()*+,-./{}~//:;'"

    for(let i=1; i<= length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass  += str.charAt(char)
    }

    setPassword(pass)
     
  }, [length, numAllowed, charAllow, setPassword])
  
  const copyOnClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,  3);
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed, charAllow, passwordGenerator])
return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-700'>
        <h1 className='text-center pt-5 my-3 text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" ref={passwordRef} placeholder='Password' readOnly value={password} className='outline-none w-full py-1 px-3' name="" id="" />
          <button onClick={copyOnClipboard()}
           className='outline-none py-0.5 shrink-0 bg-blue-700 text-white px-3 '>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={15} value={length} onChange={(e)=>{
              setLength(e.target.value)
            }} className='cursor-pointer'/>
            <label htmlFor="">Lenth : {length}</label>            
          </div>
          {/* Number allowed */}
          <div className='flex items-center gap-x-1'>
                <input type="checkbox" defaultChecked={numAllowed} id='numberInputs' onChange={()=> setNumAllowed((prev)=>!prev)} />
                <label htmlFor="">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
                <input type="checkbox" defaultChecked={charAllow} id='charInputs' onChange={()=> setCharAllow((prev)=>!prev)} />
                <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
 