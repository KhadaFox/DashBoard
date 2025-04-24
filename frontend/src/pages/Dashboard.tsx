
import { useEffect, useState } from 'react';
import axios from 'axios';
import profileImg from '../assets/User.jpeg';
import logo from '../assets/logo-dashboard-branco.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const carregarTransacoes = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get('http://localhost:3333/transactions', {
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

  const receitas = transacoes.filter(t => t.tipo === 'entrada');
  const despesas = transacoes.filter(t => t.tipo === 'saida');

  const receitaMensal = receitas.reduce((acc, t) => acc + t.valor, 0);
  const despesaMensal = despesas.reduce((acc, t) => acc + t.valor, 0);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a href="#"><img src={logo} alt='Logo' style={{ height: '42px' }} /></a>
        <div className="ms-auto d-flex align-items-center">
          <span className="text-white me-3">{userName}</span>
          <img src={profileImg} alt="Perfil" width="40" height="40" className="rounded-circle" />
        </div>
      </nav>

      <div className="container my-5">
        <div className="row align-items-center mb-5">
          <div className="col-md-6 d-flex align-items-center gap-4">
            <img src={profileImg} alt="Perfil" width="80" height="80" className="rounded-circle shadow" />
            <div>
              <h4 className="fw-bold mb-0">Olá, {userName}!</h4>
              <small className="text-muted">Gerencie suas finanças de forma prática.</small>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column align-items-md-end align-items-start mt-4 mt-md-0">
            <div>
              <h5 className="text-muted">Saldo Atual</h5>
              <h3 className={`fw-bold ${saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                R$ {saldo.toFixed(2)}
              </h3>
            </div>
            <button
              className="btn btn-primary mt-2 px-3 py-1"
              data-bs-toggle="modal"
              data-bs-target="#inserirSaldoModal"
            >
              Inserir Saldo
            </button>
          </div>
        </div>

        {/* Receita e Despesa */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-3">
              <h6 className="text-muted">Receita Mensal</h6>
              <h4 className="text-success">R$ {receitaMensal.toFixed(2)}</h4>
            </div>
          </div>
          <div className="col-md-6 mt-3 mt-md-0">
            <div className="card border-0 shadow-sm p-3">
              <h6 className="text-muted">Despesa Mensal</h6>
              <h4 className="text-danger">R$ {despesaMensal.toFixed(2)}</h4>
            </div>
          </div>
        </div>

        {/* Modalidades de despesa */}
        <div>
          <h5 className="mb-3 text-muted">Modalidades de Despesa</h5>
          <div className="row g-3">
            {['Investimentos', 'Educação', 'Pet', 'Alimentação', 'Outros'].map((categoria) => (
              <div key={categoria} className="col-md-4">
                <div className="card border-0 shadow-sm p-3">
                  <h6 className="mb-0">{categoria}</h6>
                  <small className="text-muted">Resumo da categoria</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Inserir Saldo */}
<div className="modal fade" id="inserirSaldoModal" tabIndex={-1} aria-labelledby="inserirSaldoLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="inserirSaldoLabel">Inserir Saldo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="mb-3">
          <label htmlFor="valorSaldo" className="form-label">Valor</label>
          <input type="number" className="form-control" id="valorSaldo" placeholder="Digite o valor" />
        </div>
        <div className="mb-3">
          <label htmlFor="dataTransacao" className="form-label">Data</label>
          <input type="date" className="form-control" id="dataTransacao" />
        </div>
        <div className="mb-3">
          <label htmlFor="categoriaTransacao" className="form-label">Modalidade</label>
          <select className="form-select" id="categoriaTransacao">
            <option value="Outros">Outros</option>
            <option value="Educação">Educação</option>
            <option value="Investimentos">Investimentos</option>
            <option value="Pet">Pet</option>
            <option value="Alimentação">Alimentação</option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={async () => {
            const valorInput = document.getElementById("valorSaldo") as HTMLInputElement;
            const dataInput = document.getElementById("dataTransacao") as HTMLInputElement;
            const categoriaInput = document.getElementById("categoriaTransacao") as HTMLSelectElement;
          
            const valor = parseFloat(valorInput.value);
            const data = dataInput.value;
            const categoria = categoriaInput.value;
            const token = localStorage.getItem("token");
          
            if (!isNaN(valor) && data && categoria && token) {
              try {
                await axios.post(
                  "http://localhost:3333/transactions",
                  {
                    title: "Saldo manual",
                    amount: valor, // <-- correção aqui
                    type: "entrada", // <-- correção aqui se o backend espera "tipo" e não "type"
                    categoria,
                    data
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
          
                carregarTransacoes();
                valorInput.value = "";
                dataInput.value = "";
                categoriaInput.value = "Outros";
          
                const modalElement = document.getElementById("inserirSaldoModal");
                interface BootstrapModal {
                  hide: () => void;
                }
                
                interface Bootstrap {
                  Modal: new (element: Element) => BootstrapModal;
                }
                
                const modal = new (window as unknown as { bootstrap: Bootstrap }).bootstrap.Modal(modalElement!);
                modal.hide();
              } catch (err) {
                console.error("Erro ao inserir saldo:", err);
              }
            } else {
              alert("Preencha todos os campos corretamente.");
            }
          }}
          
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Dashboard;
