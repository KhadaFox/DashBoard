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
        nome,
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
    <div className="container mt-5">
      <h2 className="mb-4">Cadastro</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
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
        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <button type="submit" className="btn btn-success">Cadastrar</button>
            <p className="mt-3">
                Já tem conta? <Link to="/">Faça login</Link>
            </p>     
      </form>
    </div>
  );
};

export default Register;
