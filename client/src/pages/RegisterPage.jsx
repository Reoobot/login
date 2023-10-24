import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


export default function RegisterPage() {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) {
        ev.preventDefault()
       try {
        
           await axios.post('https://geode-receptive-adasaurus.glitch.me/register', {
               name,
               email,
               password,
           })
           alert('Registrstion successful. Now you can login')
       } catch (e) {
        alert('Registration failes. Please try agai later')
       }
    }
    return (
        <div>
     
            <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-64">
                    <h1 className="text-center text-4xl mb-4">Register</h1>
                    <form className="max-w-md mx-auto" onSubmit={registerUser}>
                        <input value={name} onChange={ev=>setName(ev.target.value)} type="text" placeholder="Falexis"/>
                        <input value={email} onChange={ev=>setEmail(ev.target.value)} type="email" placeholder="your@email.com"/>
                        <input value={password} onChange={ev=>setPassword(ev.target.value)} type="password" placeholder="password"/>
                        <button className="primary">Register</button>
                        <div className="text-center py-2 text-gray-500"  >
                        Already a momber?  <Link to={'/login'} className="underline text-black">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}