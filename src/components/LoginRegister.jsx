import React, { useState } from "react";
import axios from "axios";

const LoginRegister = ({ onLoginSuccess }) => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/admin/login", {
        login_name: loginName,
        password: password,
      });
      onLoginSuccess(res.data); // truyền user đã login lên App
    } catch (err) {
      setError("Sai tên đăng nhập hoặc mật khẩu");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Đăng nhập</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Login Name"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
      /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default LoginRegister;
