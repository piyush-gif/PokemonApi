import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const { data, loading, error, setError, handlePost } = useFetch();

  useEffect(() => {
    if (data?.message) {
      navigate("/");
    }
  }, [data]);
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
    const body = {
      username: form.username,
      password: form.password,
    };
    handlePost("http://localhost:8000/login", body);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {error && <div>{error}</div>}
        {loading && <p> Loading...</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="username"
          ></input>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="password"
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
