import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";

const LoginPage = () => {
  const { user, setUser } = useAuthStore();
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { data, loading, error, setError, handlePost } = useFetch();

  useEffect(() => {
    if (data?.access_token) {
      setUser({ username: data.username, email: data.email });
      navigate("/");
    }
  }, [data]);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validation = () => {
    if (!form.username.trim()) {
      setError("Username required");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) return;
    handlePost("http://localhost:8000/login", {
      username: form.username,
      password: form.password,
    });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {error && <div>{error}</div>}
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="username"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
