import React, { useContext } from 'react';
import { TransactionContext } from './TransactionContext';
import { List, ListItem, ListItemText, IconButton, Typography, Paper, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(TransactionContext);

  return (
    <Paper elevation={3} className="p-6 rounded-2xl" dir="rtl">
      <Typography variant="h6" className="mb-4 font-bold">تاریخچه تراکنش‌ها</Typography>
      {transactions.length === 0 ? (
        <Typography className="text-gray-500 text-center py-10">تراکنشی یافت نشد.</Typography>
      ) : (
        <List>
          {transactions.map((t) => (
            <ListItem
              key={t.id}
              className="border-b last:border-0"
              secondaryAction={
                <IconButton onClick={() => deleteTransaction(t.id)}>
                  <DeleteIcon className="text-red-400" />
                </IconButton>
              }
            >
              <ListItemText
                primary={<span className="font-bold">{t.title}</span>}
                secondary={
                  <div className="flex gap-2 items-center mt-1">
                    <Chip label={t.category} size="small" />
                    <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {t.amount.toLocaleString()} تومان
                    </span>
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default TransactionList;