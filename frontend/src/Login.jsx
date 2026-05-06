import { useState } from "react";
import InputField from "./components/InputField";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useEffect } from "react";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const { login, user} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.user);
      navigate("/dashboard");
    } else {
      setError(data.message);
    }
  };

  const handleSignup = async () => {
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.user);
      navigate("/dashboard");
    } else {
      setError(data.message);
    }
  };

    useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);


  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-zinc-500">
      <h1 className="text-2xl py-2 text-white font-bold">
        {showSignup ? "Signup form" : "Login Form"}
      </h1>

      <div className="w-64 h-auto space-y-4 bg-white rounded-xl shadow-lg shadow-zinc-900 p-4">
        {showSignup && (
          <InputField
            label="Username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Username"
          />
        )}
        <InputField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email or Username"
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!showSignup ? (
          <button
            onClick={handleLogin}
            className="h-10 w-full bg-zinc-500 font-bold text-white mt-4 py-2 rounded-lg"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleSignup}
            className="h-10 w-full bg-zinc-500 font-bold text-white mt-4 py-2 rounded-lg"
          >
            Sign Up
          </button>
        )}

        <button
          onClick={() => setShowSignup(!showSignup)}
          className="text-center w-full text-blue-500 font-semibold mt-4 text-xs"
        >
          {showSignup ? "Already have an account?" : "Create an Account"}
        </button>
      </div>
    </div>
  );
}

export default Login;
