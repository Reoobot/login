import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../componet/Header";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
          const response = await axios.post('https://geode-receptive-adasaurus.glitch.me/login', { email, password });
        //   console.log('Respuesta de la solicitud:', response.data);
      
          // Convierte la respuesta en una cadena JSON
          const responseJSON = JSON.stringify(response.data);
      
          // Guarda la cadena JSON en la cookie
          Cookies.set("loginResponse", responseJSON);
      
          alert('Login successful');
          navigate('/account');
        } catch (error) {
          console.error('Login error:', error);
          alert('Login failed');
        }
      }
      

    return (
        <div>
            {/* <Header/> */}
            <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-64">
                    <h1 className="text-center text-4xl mb-4">Login</h1>
                    <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                        <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
                        <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                        <button className="primary">Login</button>
                        <div className="text-center py-2 text-gray-500">
                            Don't have an account yet? <Link to={'/register'} className="underline text-black">Register now</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
