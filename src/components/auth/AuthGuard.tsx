import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { API_BASE_URL } from "../../config";

type Props = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_BASE_URL}/api/auth/getme`, {
          withCredentials: true,
        });
        setIsSignedIn(true);
      } catch {
        setIsSignedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading)
    return (
      <div className="bg-blue-200 flex items-center justify-center text-3xl font-bold text-white w-[100vw] h-[100vh]">
        Loading...
      </div>
    );
  if (!isSignedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default AuthGuard;
