import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    checkpassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
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
