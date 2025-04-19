import React, { useState } from 'react';
import axios from 'axios';

interface TransactionModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ show, onClose, onSuccess }) => {

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post('http://localhost:3333/transacoes', {
        descricao,
        valor: parseFloat(valor),
        tipo,
        data,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onSuccess(); // Atualiza transações no dashboard
      onClose();   // Fecha o modal
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      alert('Erro ao salvar transação!');
    }
  };
  if (!show) return null;
  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nova Transação</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Valor (R$)</label>
                <input
                  type="number"
                  className="form-control"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select
                  className="form-select"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Data</label>
                <input
                  type="date"
                  className="form-control"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
