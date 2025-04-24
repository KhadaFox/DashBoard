import React, { useState } from "react";

interface TransactionFormProps {
  onSubmit: (data: {
    title: string;
    amount: number;
    type: string;
    categoria: string;
  }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("income");
  const [categoria, setCategoria] = useState("Educação");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, amount, type, categoria });
    setTitle("");
    setAmount(0);
    setType("income");
    setCategoria("Educação");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-control mb-2"
      />
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
        className="form-control mb-2"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="form-control mb-2"
      >
        <option value="income">Receita</option>
        <option value="expense">Despesa</option>
      </select>

      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="form-control mb-3"
      >
        <option value="Educação">Educação</option>
        <option value="Investimentos">Investimentos</option>
        <option value="Pet">Pet</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Outros">Outros</option>
      </select>

      <button type="submit" className="btn btn-primary w-100">
        Adicionar Transação
      </button>
    </form>
  );
};

export default TransactionForm;
