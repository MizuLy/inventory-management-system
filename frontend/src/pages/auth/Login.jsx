import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuEye,
  LuEyeOff,
  LuLock,
  LuMail,
  LuLoader,
  LuArrowRight,
} from "react-icons/lu";
import { login } from "../../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-nord-50 p-4 font-belanosima relative overflow-hidden">
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-nord-frost/20 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white border border-nord-200 p-10 rounded-[2.5rem] shadow-xl shadow-nord-900/5">
          <div className="text-center mb-10">
            <h1 className="text-5xl text-nord-900 mb-2 tracking-tighter">
              KS GROUP
            </h1>
            <p className="text-nord-800 text-[11px] uppercase tracking-[0.4em] font-black opacity-70">
              Admin Portal Access
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Identity / Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-nord-800 ml-1">
                Identity
              </label>
              <div className="relative group font-sans">
                <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-nord-400 group-focus-within:text-nord-frost transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@ks.com"
                  className="w-full pl-12 pr-4 py-4 bg-nord-50 border border-nord-200 rounded-2xl text-nord-900 font-bold outline-none focus:border-nord-frost focus:bg-white transition-all placeholder:text-nord-400"
                />
              </div>
            </div>

            {/* Credential / Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-nord-800 ml-1">
                Credential
              </label>
              <div className="relative group font-sans">
                <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-nord-400 group-focus-within:text-nord-frost transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-nord-50 border border-nord-200 rounded-2xl text-nord-900 font-bold outline-none focus:border-nord-frost focus:bg-white transition-all placeholder:text-nord-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-nord-400 hover:text-nord-900 transition"
                >
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-black text-white bg-nord-frost hover:brightness-95 active:scale-[0.98] transition-all shadow-lg shadow-nord-frost/30 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <LuLoader className="animate-spin" size={20} />
              ) : (
                <div className="flex items-center gap-2 uppercase tracking-widest text-xs">
                  <span>Sign In</span>
                  <LuArrowRight size={20} />
                </div>
              )}
            </button>
          </form>

          <div className="mt-12 text-center pt-6 border-t border-nord-100">
            <p className="text-nord-900 text-[10px] uppercase tracking-[0.3em] font-black opacity-40">
              Secure Environment v2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
