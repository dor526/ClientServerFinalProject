import {useState} from 'react'
const Login = () =>{
    const [email ,setEmail] =useState('')
    const [password ,setPassword] =useState('')

    const [error, setError] = useState(null)

    const onSubmitClick = async (e) =>{
        e.preventDefault()

        setError(null)
        const response = await fetch('/api/user/login', {
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
            window.location.href = '/dashboard'; // Redirect to Dashboard
          }


        console.log(email, password)
    }
    return (
        <form className='login' onSubmit={onSubmitClick} >
           <h2>Log in</h2>
           <label>Email:</label>
           <input type='text' onChange={(e) =>setEmail(e.target.value)} value={email}></input>
            <br></br>
           <label>password:</label>
           <input type='password' onChange={(e) =>setPassword(e.target.value)} value={password}></input>

           <button>Log in</button>
           {error && <div className='error'>{error}</div>}


        </form>
    )

}

export default Login