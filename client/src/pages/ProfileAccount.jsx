import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileAccount() {
  const navigate = useNavigate();

  function logout() {
    // Elimina las cookies o los datos de sesión aquí
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "loginResponse=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirige al usuario a la página IndexPage (o cualquier otra página que desees)
    navigate("/");
  }

  return (
    <div>
      <button onClick={logout} className="primary max-w-sm mt-2 border-solid">
        Logout
      </button>
    </div>
  );
}
