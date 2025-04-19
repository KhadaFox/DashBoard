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

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="mt-4">
      <h4>Transações</h4>
      <ul className="list-group">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              tx.type === 'income' ? 'list-group-item-success' : 'list-group-item-danger'
            }`}
          >
            <span>{tx.title}</span>
            <span>
              {tx.type === 'income' ? '+' : '-'} R$ {tx.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
