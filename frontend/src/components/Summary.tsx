import React from 'react';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  createdAt: string;
}

interface Props {
  transactions: Transaction[];
}

const Summary: React.FC<Props> = ({ transactions }) => {
  const income = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income - expense;

  return (
    <div className="row my-4">
      <div className="col">
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <h5 className="card-title">Entradas</h5>
            <p className="card-text">R$ {income}</p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card text-white bg-danger mb-3">
          <div className="card-body">
            <h5 className="card-title">Saídas</h5>
            <p className="card-text">R$ {expense}</p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card text-white bg-primary mb-3">
          <div className="card-body">
            <h5 className="card-title">Saldo</h5>
            <p className="card-text">R$ {balance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
