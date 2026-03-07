import { useState } from "react";

const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
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
  );
};

export default LoginPage;
