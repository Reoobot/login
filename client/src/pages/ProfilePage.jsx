import React, { useContext, useEffect } from "react";
import axios from 'axios';
import { UserContext } from "../componet/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../componet/AccountNav";

axios.defaults.withCredentials = true;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { ready, user, setUser } = useContext(UserContext);
  const { subpage } = useParams();

  useEffect(() => {
    // Función para obtener el valor de una cookie
    function getCookieValue(cookieName) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1, cookie.length));
        }
      }
      return null;
    }
    
    // Obtén el valor de la cookie "loginResponse"
    const loginResponse = getCookieValue('loginResponse');
    
    if (loginResponse) {
      try {
        // Intenta analizar el valor de la cookie como JSON
        const userData = JSON.parse(loginResponse);
        setUser(userData);

        // Si deseas obtener los datos del perfil del usuario desde la URL, haz una solicitud a la URL directamente
        axios.get(`https://geode-receptive-adasaurus.glitch.me/user/${userData.id}`)
          .then(({ data }) => {
            console.log('Datos del perfil:', data);
            setUser(data);
           
          })
          .catch((error) => {
            console.error('Error al obtener datos del perfil:', error);
          });
      } catch (error) {
        console.error('Error al analizar la cookie "loginResponse":', error);
      }
    }
  }, [setUser]);

  function logout() {
    // Agrega aquí la lógica para cerrar la sesión del usuario
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2 border-solid">Logout</button>
        </div>
      )}
    </div>
  );
}
