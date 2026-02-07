import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const API_BASE_URL =
          window.location.hostname === "localhost"
            ? "http://localhost:4000"
            : "https://sare-kart-backend-production.up.railway.app";

        const res = await axios.get(
          `${API_BASE_URL}/api/v1/sarekart/auth`,
          { withCredentials: true }
        );

        if (res.data.authenticated === true) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { loading, isAuth };
}
