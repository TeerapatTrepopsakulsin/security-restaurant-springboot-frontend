import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", {
        username,
        password,
      });

      console.log("Login OK", res.data);
      navigate("/restaurant"); // redirect after login
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid login");
    } 
  }

  return (
    <div className="p-5 max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
      >
        Login
      </button>
    </form>

    <h2 className="text-xl font-semibold mt-10 mb-4 text-center">Google Login</h2>
    <div className="flex justify-center">
      <GoogleLoginButton />
    </div>
  </div>
  );
}
