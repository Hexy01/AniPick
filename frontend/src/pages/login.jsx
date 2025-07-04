import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Login({ setUsername }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", form);
      const { token, username } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setUsername(username); // ✅ trigger navbar update
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-box">
          <h2>Login to AniPick 🍥</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
            <button type="submit">Login</button>
          </form>
          <p className="text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
      <style>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #39163d;
          padding: 20px;
        }

        .login-box {
          background: #ffffff;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .login-box h2 {
          text-align: center;
          color: #ff6f91;
          margin-bottom: 20px;
        }

        .login-box label {
          display: block;
          margin-top: 15px;
          margin-bottom: 5px;
          color: #333;
        }

        .login-box input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
        }

        .login-box button {
          width: 100%;
          padding: 12px;
          background-color: #ff6f91;
          border: none;
          color: white;
          font-weight: bold;
          border-radius: 10px;
          cursor: pointer;
        }

        .login-box button:hover {
          background-color: #ff4f7c;
        }

        .text {
          text-align: center;
          margin-top: 10px;
          color: #555;
        }

        .text a {
          color: #ff6f91;
          font-weight: bold;
          text-decoration: none;
        }

        .error {
          text-align: center;
          color: red;
          margin-bottom: 10px;
        }

          .navbar {
    width: 100vw;           /* Full screen width */
    margin: 0 auto;         /* Center it */
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box; /* Important for padding to behave */
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }

      `}</style>
    </>
  );
}

export default Login;
