import {useState} from 'react'
const Signup = () =>{
    const [email ,setEmail] =useState('')
    const [password ,setPassword] =useState('')

    const [error, setError] = useState(null)

    const onSubmitClick = async (e) =>{
        e.preventDefault()

        setError(null)
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
          })
          const json = await response.json()
          if (!response.ok) {
            setError(json.error)
          }
          if (response.ok) {
            console.log(json)
          }

        console.log(email, password)
    }
    return (
        <form className='signup' onSubmit={onSubmitClick} >
           <h2>Sign up</h2>
           <label>Email:</label>
           <input type='text' onChange={(e) =>setEmail(e.target.value)} value={email}></input>

           <label>password:</label>
           <input type='password' onChange={(e) =>setPassword(e.target.value)} value={password}></input>

           <button>Sign up</button>
           {error && <div className='error'>{error}</div>}

        </form>
    )

}

export default Signup