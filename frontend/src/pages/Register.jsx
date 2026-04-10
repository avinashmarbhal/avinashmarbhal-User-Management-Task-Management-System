import { useState } from "react";
import { registerUser } from "../features/auth/authAPI";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegister = async () => {
    setError("");

    if (!form.name) {
      return setError("Name is required");
    }

    if (!validateEmail(form.email)) {
      return setError("Invalid email format");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      await registerUser(form);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Register
        </button>

        
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}