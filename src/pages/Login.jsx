import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Code2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Label from "../components/common/Label";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to continue</p>
        </div>

        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              {/* <label c<lassName="block text-sm text-slate-300 mb-2">Email</label> */}
              <Label className="text-sm! mb-2! block">Email</Label>
              <Input
                type={email}
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className=" -mt-2">
              <Label className="mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter password"
                  className="pr-12"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className=" bg-blue-600 hover:bg-blue-700 text-white w-full font-semibold transition "
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-slate-400 mt-6">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign Up
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
}
