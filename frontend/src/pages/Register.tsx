import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3333/auth/register', {
        name: nome,
        email,
        password: senha,
      });

      setSucesso('Usuário registrado com sucesso!');
      setErro('');
      setNome('');
      setEmail('');
      setSenha('');
    } catch {
      setErro('Erro ao registrar. Verifique os dados.');
      setSucesso('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-5 rounded-4 shadow bg-white" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="mb-4 text-center">
          <h2 className="fw-bold mb-1">Criar Conta</h2>
          <p className="text-muted small">Preencha os dados para se cadastrar</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

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
          {sucesso && <div className="alert alert-success py-2 text-center">{sucesso}</div>}

          <button type="submit" className="btn btn-dark w-100 py-2 mt-2">Cadastrar</button>

          <div className="text-center mt-3">
            <small className="text-muted">
              Já tem conta? <Link to="/">Faça login</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
