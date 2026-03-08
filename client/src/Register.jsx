import { useState } from "react";
import useFetch from "../hooks/useFetch";
const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    checkpassword: "",
  });

  const { data, loading, error, setError, handlePost } = useFetch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validation = () => {
    if (!form.username.trim()) {
      setError("Username required");
      return false;
    }
    if (!form.email.includes("@")) {
      setError("Invalid email");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (form.password !== form.checkpassword) {
      setError("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) return;
    const body = {
      username: form.username,
      email: form.email,
      password: form.password,
    };

    handlePost("http://127.0.0.1:8000/register", body);
  };
  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <p> Loading...</p>}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={form.username}
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            value={form.email}
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <input
            value={form.password}
            placeholder="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            value={form.checkpassword}
            placeholder="password"
            name="checkpassword"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
