import { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionModal from '../components/TransactionModal';

interface Transaction {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  tipo: 'entrada' | 'saida';
}

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = () => {
    carregarTransacoes();
    setShowModal(false);
  };

  const carregarTransacoes = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get('http://localhost:3333/transacoes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTransacoes(res.data);
        const saldoCalculado = res.data.reduce((acc: number, trans: Transaction) => {
          return trans.tipo === 'entrada' ? acc + trans.valor : acc - trans.valor;
        }, 0);
        setSaldo(saldoCalculado);
      })
      .catch((err) => {
        console.error('Erro ao carregar transações:', err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const utf8Decoder = new TextDecoder('utf-8');
        const payloadJson = utf8Decoder.decode(
          Uint8Array.from(atob(payloadBase64), c => c.charCodeAt(0))
        );
        const payloadDecoded = JSON.parse(payloadJson);
        setUserName(payloadDecoded.name);
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
      }

      carregarTransacoes();
    }
  }, []);

  return (
    <div className="container my-5 p-4 rounded-4 shadow bg-body">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Bem-vindo, <span className="text-primary">{userName || 'usuário'}</span>!</h2>
          <p className="text-muted">Este é o seu painel de controle financeiro.</p>
        </div>
        <button className="btn btn-success px-4 py-2 rounded-3 d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle"></i> Nova Transação
        </button>
      </div>
  
      {/* Saldo */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title text-muted mb-2">Saldo Atual</h5>
          <h3 className={`fw-bold ${saldo >= 0 ? 'text-success' : 'text-danger'}`}>
            R$ {saldo.toFixed(2)}
          </h3>
        </div>
      </div>
  
      {/* Transações */}
      <h4 className="fw-semibold text-secondary mb-3">Transações</h4>
      {transacoes.length === 0 ? (
        <div className="alert alert-light border text-muted">Você ainda não possui transações.</div>
      ) : (
        <ul className="list-group">
          {transacoes.map((trans) => (
            <li
              key={trans.id}
              className="list-group-item d-flex justify-content-between align-items-center border-0 mb-2 rounded-3 shadow-sm px-3 py-3"
            >
              <div>
                <h6 className="mb-1">{trans.descricao}</h6>
                <small className="text-muted">{new Date(trans.data).toLocaleDateString()}</small>
              </div>
              <div className="text-end">
                <span className={`fw-semibold ${trans.tipo === 'entrada' ? 'text-success' : 'text-danger'}`}>
                  {trans.tipo === 'entrada' ? '+' : '-'} R$ {trans.valor.toFixed(2)}
                </span>
                <div>
                  <span className={`badge bg-${trans.tipo === 'entrada' ? 'success' : 'danger'} ms-2`}>
                    {trans.tipo}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
  
      {/* Modal */}
      {showModal && (
        <TransactionModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}

export default Dashboard;
