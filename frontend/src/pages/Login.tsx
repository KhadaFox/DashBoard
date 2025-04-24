import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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

      const { token } = response.data;
      localStorage.setItem('token', token);
      setErro('');
      navigate('/dashboard');
    } catch {
      setErro('Email ou senha inválidos.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-5 rounded-4 shadow bg-white" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="mb-4 text-center">
          {/* Logo opcional */}
          {/* <img src="/logo.png" alt="Logo" className="mb-3" style={{ maxWidth: 120 }} /> */}
          <h2 className="fw-bold mb-1">Bem-vindo</h2>
          <p className="text-muted small">Acesse sua conta para continuar</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="seu@email.com"
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
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && <div className="alert alert-danger py-2 text-center">{erro}</div>}

          <button type="submit" className="btn btn-dark w-100 py-2 mt-2">Entrar</button>

          <div className="text-center mt-3">
            <small className="text-muted">Esqueceu a senha? <a href="#">Clique aqui</a></small>
          </div>

          <div className="text-center mt-2">
            <small className="text-muted">
              Não tem conta? <Link to="/register">Cadastre-se</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
