import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Obtén el valor de la cookie 'loginResponse'
    const loginResponse = getCookieValue('loginResponse');

    if (loginResponse) {
      try {
        // Intenta analizar el valor de la cookie como JSON
        const userData = JSON.parse(loginResponse);
        setUser(userData);
        setReady(true);
        console.log('Mi perfil', userData);
      } catch (error) {
        console.error('Error al analizar la cookie "loginResponse":', error);
      }
    }
  }, []);

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

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
