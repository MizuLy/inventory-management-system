import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuEye,
  LuEyeOff,
  LuLock,
  LuMail,
  LuLoader,
  LuArrowBigRightDash,
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
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden p-4 font-instrumentsans">
      {/* Sunset Horizon Glow - Bottom Light Source */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-orange-600/20 via-red-900/10 to-transparent pointer-events-none"></div>

      {/* The "Setting Sun" Bloom */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-orange-500 opacity-[0.08] blur-[140px] rounded-full pointer-events-none"></div>

      {/* Floating Card */}
      <div className="w-full max-w-md z-10">
        <div className="bg-[#0D0D0D]/60 backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
          <div className="text-center mb-10">
            <h1 className="font-belanosima text-4xl text-white mb-2 tracking-tighter">
              KS GROUP
            </h1>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black">
              End of Day Authentication
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange-500/60 ml-1">
                Identity
              </label>
              <div className="relative group">
                <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@ks.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl text-white outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange-500/60 ml-1">
                Credential
              </label>
              <div className="relative group">
                <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-white/[0.02] border border-white/10 rounded-2xl text-white outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition"
                >
                  {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r from-orange-600 to-red-600 hover:brightness-110 active:scale-[0.97] transition-all shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <LuLoader className="animate-spin" size={20} />
              ) : (
                <div className="flex items-center gap-2 uppercase tracking-widest text-xs">
                  <span>Login</span>
                  <LuArrowBigRightDash size={20} />
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
