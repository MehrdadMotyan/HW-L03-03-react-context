import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem('transactions');
    return savedData ? JSON.parse(savedData) : [];
  });

  const [categories, setCategories] = useState(['غذا', 'حمل و نقل', 'قبوض', 'تفریح']);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      categories, 
      addTransaction, 
      deleteTransaction,
      setCategories 
    }}>
      {children}
    </TransactionContext.Provider>
  );
};