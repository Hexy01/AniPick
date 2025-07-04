import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Signup({ setUsername }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, form);

      if (res.status === 201 || res.status === 200) {
        const { token, username } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setUsername(username); // ✅ Update parent immediately
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-box">
          <h2>Join AniPick 🍡</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
            <button type="submit">Sign Up</button>
          </form>
          <p className="text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      <style>{`
        .navbar {
          width: 100vw;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
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

        .signup-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #39163d;
          padding: 20px;
        }

        .signup-box {
          background: #ffffff;
          padding: 40px;
          margin-top: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }

        .signup-box h2 {
          text-align: center;
          color: #ff6f91;
          margin-bottom: 20px;
        }

        .signup-box label {
          display: block;
          margin-top: 15px;
          margin-bottom: 5px;
          color: #333;
        }

        .signup-box input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
        }

        .signup-box button {
          width: 100%;
          padding: 12px;
          background-color: #ff6f91;
          border: none;
          color: white;
          font-weight: bold;
          border-radius: 10px;
          cursor: pointer;
        }

        .signup-box button:hover {
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
      `}</style>
    </>
  );
}

export default Signup;
