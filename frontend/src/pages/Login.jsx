import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authAPI";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    setError("");

    if (!validateEmail(form.email)) {
      return setError("Invalid email format");
    }

    if (!form.password) {
      return setError("Password is required");
    }

    try {
      const res = await loginUser(form);
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        {/* 🔗 Register Button */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}