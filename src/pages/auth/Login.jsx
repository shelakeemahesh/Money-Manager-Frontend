import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Sun, 
  Moon, 
  Mail, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Info,
  Zap
} from "lucide-react";
import AppContext from "../../context/AppContext";
import { toast } from "sonner";
import { login, googleLogin } from "../../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import useSEO from "../../utils/useSEO";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Login = () => {
  useSEO({
    title: "Sign In",
    description: "Access your CredoWallet wealth manager. Log in with your email or phone number or use Google OAuth for instant secure sign-in.",
    keywords: "login, secure login, auth, credential check, access account"
  });

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [takingLong, setTakingLong] = useState(false);
  
  const { setUser, theme, toggleTheme } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const trimmedInput = emailOrPhone.trim();
    if (!trimmedInput) {
      toast.error("Please enter your email or phone number");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setLoading(true);
    setTakingLong(false);

    const timer = setTimeout(() => {
      setTakingLong(true);
    }, 4000);

    try {
      const response = await login({ emailOrPhone: trimmedInput, password });
      if (response.status === 200) {
        const { token, profile } = response.data;
        
        // Save auth data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(profile));
        if (rememberMe) {
          localStorage.setItem("remembered_login", trimmedInput);
        } else {
          localStorage.removeItem("remembered_login");
        }
        
        setUser(profile);
        toast.success("Successfully logged in!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed. Please verify your credentials.");
    } finally {
      clearTimeout(timer);
      setLoading(false);
      setTakingLong(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[var(--surface-2)] text-[var(--text-primary)] transition-colors duration-200">
      
      {/* Floating Theme Toggle (Top Right) */}
      <button 
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed top-5 right-5 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] border-[var(--border)] shadow-sm transition-all cursor-pointer text-xs font-medium"
      >
        {theme === "dark" ? (
          <>
            <Sun size={14} className="text-amber-400" />
            <span className="hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <Moon size={14} className="text-indigo-500" />
            <span className="hidden sm:inline">Dark</span>
          </>
        )}
      </button>

      {/* ========================================================================= */}
      {/* Left Panel - Premium Fintech Showcase (Desktop lg+)                      */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:flex flex-col justify-between w-[500px] xl:w-[560px] p-12 xl:p-14 relative overflow-hidden shrink-0 border-r border-[var(--border)] bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 text-white"
      >
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] bg-indigo-500/15 pointer-events-none" />
        <div className="absolute bottom-12 -right-20 w-80 h-80 rounded-full blur-[130px] bg-emerald-500/15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full blur-[100px] bg-purple-500/10 pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Wallet size={20} className="text-white" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">CredoWallet</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400">Fintech Intelligence</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Systems Online</span>
            </div>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold leading-[1.2] tracking-tight mb-4 text-white">
            Master your wealth <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
              with intelligent precision.
            </span>
          </h1>
          
          <p className="text-xs xl:text-sm leading-relaxed mb-8 text-zinc-400 max-w-[420px]">
            Real-time cash flow tracking, automated expense categorization, and AI-driven insights to accelerate your financial freedom.
          </p>

          {/* Interactive Mock Portfolio Card */}
          <div className="rounded-2xl p-5 mb-8 bg-zinc-900/80 border border-zinc-800/80 shadow-2xl backdrop-blur-xl relative">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Total Portfolio Balance</p>
                <p className="text-2xl font-black tracking-tight text-white mt-0.5">$38,420.50</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <TrendingUp size={12} />
                +14.8%
              </span>
            </div>

            {/* Mini Progress / Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-zinc-800/60">
              <div className="bg-zinc-800/50 rounded-lg p-2.5">
                <p className="text-[10px] text-zinc-400">Monthly Savings</p>
                <p className="text-xs font-bold text-white mt-0.5">$2,840.00</p>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-2.5">
                <p className="text-[10px] text-zinc-400">Budget Health</p>
                <p className="text-xs font-bold text-emerald-400 mt-0.5">Optimal (94%)</p>
              </div>
            </div>

            {/* AI Insight Pill */}
            <div className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300">
              <Sparkles size={14} className="shrink-0 text-indigo-400" />
              <span>AI Insight: You're on track to reach your quarterly goal 12 days early.</span>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3.5">
            {[
              { icon: Zap, label: "Real-time Multi-Currency Tracking", desc: "Instant sync with global bank standards & live rates." },
              { icon: ShieldCheck, label: "Bank-Grade AES-256 Security", desc: "Full end-to-end encryption & private session isolation." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-zinc-800/70 border border-zinc-700/60 text-indigo-300">
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">{item.label}</p>
                    <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>SOC2 Type II & GDPR Compliant</span>
          </div>
          <span>© 2026 CredoWallet</span>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* Right Panel - Modern Glassmorphic Login Form                              */}
      {/* ========================================================================= */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 relative overflow-y-auto">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute w-[450px] h-[450px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[130px] -top-16 -right-16 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] -bottom-16 -left-16 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[420px] relative z-10"
        >
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center gap-3 justify-center mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Wallet size={18} className="text-white" />
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-base text-[var(--text-primary)] block">CredoWallet</span>
              <span className="text-[9px] font-semibold tracking-wider uppercase text-[var(--text-muted)]">Fintech Intelligence</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[var(--surface)] border border-[var(--border)] shadow-xl shadow-black/5 dark:shadow-none transition-all">
            
            {/* Form Title & Subtitle */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Welcome back
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Enter your credentials to access your financial dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email or Phone Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[var(--text-primary)]">
                  Email or Phone Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none">
                    <Mail size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="name@example.com or +919876543210"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[var(--surface-3)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => !loading && navigate("/forgot-password")}
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline transition-all cursor-pointer"
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm bg-[var(--surface-3)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-xs"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Me Option */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 border-[var(--border)] bg-[var(--surface-3)] focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="remember-me" className="text-xs text-[var(--text-secondary)] cursor-pointer select-none">
                  Keep me signed in on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in securely...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              {/* Cold Start Notice */}
              {takingLong && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2.5"
                >
                  <Info size={16} className="shrink-0 mt-0.5 text-amber-500" />
                  <p className="leading-tight">
                    Server is booting up from cold standby (Render free tier). This can take 30–50 seconds on initial connect. Please stay on this page.
                  </p>
                </motion.div>
              )}
            </form>

            {/* Social Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full border-t border-[var(--border)]" />
              <span className="absolute px-3 bg-[var(--surface)] text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Or sign in with
              </span>
            </div>

            {/* Google OAuth Button */}
            <div className="flex justify-center w-full">
              <div className="w-full flex justify-center [&>div]:w-full [&>div>iframe]:!w-full [&>div]:!max-w-full">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    setLoading(true);
                    try {
                      const res = await googleLogin(credentialResponse.credential);
                      const { token, profile } = res.data;
                      localStorage.setItem("token", token);
                      localStorage.setItem("user", JSON.stringify(profile));
                      setUser(profile);
                      toast.success("Successfully logged in with Google!");
                      navigate("/dashboard");
                    } catch (error) {
                      toast.error(error?.response?.data?.message || "Google Sign-In failed. Please try again.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  onError={() => {
                    toast.error("Google authentication failed. Please check your browser popup settings.");
                  }}
                  useOneTap
                  shape="pill"
                  size="large"
                  text="continue_with"
                  width="100%"
                />
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => !loading && navigate("/signup")}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline transition-colors cursor-pointer"
              >
                Create one now
              </button>
            </p>
          </div>

          {/* Secure SSL notice */}
          <p className="text-center text-[10px] text-[var(--text-muted)] mt-5">
            Protected with 256-bit TLS encryption & session isolation.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;