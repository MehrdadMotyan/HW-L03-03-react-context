import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { List, ListItem, ListItemText, IconButton, Typography, Paper, Chip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useContext(TransactionContext);

  return (
    <Paper elevation={3} className="p-6 rounded-2xl h-full" dir="rtl">
      <Typography variant="h6" className="mb-4 font-bold text-right text-slate-700">
        تاریخچه تراکنش‌ها
      </Typography>

      {transactions.length === 0 ? (
        <Typography className="text-gray-500 text-center py-10 font-medium">
          هنوز تراکنشی ثبت نشده است.
        </Typography>
      ) : (
        <List>
          {transactions.map((t) => (
            <ListItem
              key={t.id}
              className="mb-2 border-b last:border-0 hover:bg-slate-50 transition-all rounded-lg"
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(t.id)}>
                  <DeleteIcon className="text-red-400" />
                </IconButton>
              }
              sx={{ paddingLeft: '50px' }} // ایجاد فضا برای دکمه حذف در سمت چپ
            >
              <ListItemText
                primary={
                  <Box className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">{t.title}</span>
                    
                    {/* بخش اصلاح شده برای نمایش صحیح علامت منفی/مثبت در سمت چپ */}
                    <span 
                      className={`font-bold flex items-center gap-1 ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
                      style={{ direction: 'ltr' }} // اجبار به نمایش از چپ به راست برای اعداد و علائم
                    >
                      <span>{t.type === 'income' ? '+' : '-'}</span>
                      <span>{t.amount.toLocaleString()}</span>
                      <span className="text-[10px] mr-1" style={{ direction: 'rtl' }}>تومان</span>
                    </span>
                  </Box>
                }
                secondary={
                  <div className="flex gap-2 items-center mt-2">
                    <Chip 
                      label={t.category} 
                      size="small" 
                      variant="filled" 
                      className="bg-slate-100 text-slate-600 font-medium" 
                    />
                    <span className="text-[11px] text-gray-400 font-medium">{t.date}</span>
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