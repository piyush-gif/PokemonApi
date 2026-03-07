import { useState } from "react";

const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChnage = () => {
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
          onChange={handleChnage}
          placeholder="username"
        ></input>
        <input
          name="password"
          value={form.password}
          onChange={handleChnage}
          placeholder="password"
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
