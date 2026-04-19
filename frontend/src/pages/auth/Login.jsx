import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Importing eye icons for the toggle
import { LuEye, LuEyeOff } from "react-icons/lu";

const API = "http://localhost:6969/api/auth/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        className="space-y-4 p-6 bg-nord-polar-1 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-nord-polar-3 rounded border border-transparent focus:border-nord-frost outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <div className="relative">
            <input
              // Toggle type based on state
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-nord-polar-3 rounded border border-transparent focus:border-nord-frost outline-none"
            />
            {/* Toggle Button */}
            <button
              type="button" // CRITICAL: Must be type="button" so it doesn't submit the form
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-nord-frost hover:text-nord-snow transition"
            >
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded font-bold bg-nord-frost hover:bg-opacity-90 disabled:bg-nord-polar-4"
        >
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
