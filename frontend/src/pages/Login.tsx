import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/auth/login', {
        email,
        password: senha,
      });
      navigate('/dashboard');
      const { token } = response.data;
      localStorage.setItem('token', token);
      setErro('');
    } catch {
      setErro('Email ou senha inválidos.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <button type="submit" className="btn btn-primary">Entrar</button>
            <p className="mt-3">
                Não tem conta? <Link to="/register">Cadastre-se aqui</Link>
            </p>
      </form>
    </div>
  );
};

export default Login;
