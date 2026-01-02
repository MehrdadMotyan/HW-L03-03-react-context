import React, { useState, useContext } from 'react';
import { TextField, Button, MenuItem, Typography, Paper, ToggleButton, ToggleButtonGroup, Box, Divider } from '@mui/material';
import { TransactionContext } from '../context/TransactionContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddTransaction = () => {
  const { addTransaction, categories, setCategories } = useContext(TransactionContext);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [newCategory, setNewCategory] = useState('');

  const fieldStyle = {
    "& .MuiInputLabel-root": { left: "auto", right: "28px", transformOrigin: "right" },
    "& .MuiOutlinedInput-notchedOutline": { textAlign: "right" },
    "& .MuiInputLabel-shrink": { transform: "translate(0, -1.5px) scale(0.75)", right: "20px" }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;
    addTransaction({
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      type,
      date: new Date().toLocaleDateString('fa-IR'),
    });
    setTitle('');
    setAmount('');
    setCategory('');
  };

  return (
    <Paper elevation={3} className="p-6 rounded-2xl shadow-lg" dir="rtl">
      <Typography variant="h6" className="mb-4 font-bold text-slate-700">ثبت تراکنش جدید</Typography>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
<ToggleButtonGroup
  value={type}
  exclusive
  onChange={(e, nextType) => nextType && setType(nextType)}
  fullWidth
  sx={{
    gap: '12px', 
    '& .MuiToggleButtonGroup-grouped': {
      border: '1px solid #e2e8f0 !important', 
      borderRadius: '12px !important',
      '&.Mui-selected': {
        color: 'white',
      }
    }
  }}
>
  <ToggleButton 
    value="expense" 
    sx={{ 
      '&.Mui-selected': { backgroundColor: '#ef4444 !important' },
      color: '#ef4444',
      fontWeight: 'bold'
    }}
  >
    هزینه
  </ToggleButton>
  
  <ToggleButton 
    value="income" 
    sx={{ 
      '&.Mui-selected': { backgroundColor: '#10b981 !important' },
      color: '#10b981',
      fontWeight: 'bold'
    }}
  >
    درآمد
  </ToggleButton>
</ToggleButtonGroup>

        <TextField label="عنوان" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={fieldStyle} />
<TextField 
  label="مبلغ (تومان)" 
  type="text" 
  fullWidth 
  value={amount} 
  onChange={(e) => {
    const val = e.target.value;
    if (val === '' || /^[0-9\b]+$/.test(val)) {
      setAmount(val);
    }
  }} 
  sx={fieldStyle}
  InputLabelProps={{
    shrink: amount !== "" && amount !== undefined,
  }}
/>      
<TextField
  select
  label="انتخاب دسته‌بندی"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  fullWidth
  sx={{
    ...fieldStyle,
    "& .MuiSelect-icon": {
      right: "auto",
      left: "10px",
    },
    "& .MuiSelect-select": {
      paddingRight: "14px !important",
      paddingLeft: "40px !important",
      textAlign: "right",
    },
  }}
>
  {categories.map((cat) => (
    <MenuItem key={cat} value={cat} dir="rtl" sx={{ justifyContent: "flex-end" }}>
      {cat}
    </MenuItem>
  ))}
</TextField>

        <Box className="flex gap-2">
            <TextField 
                size="small" 
                label="دسته جدید..." 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                sx={fieldStyle}
            />
<Button 
  variant="outlined" 
  onClick={() => {
      if (newCategory && !categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
        setCategory(newCategory);
        setNewCategory('');
      }
  }} 
  startIcon={<AddCircleOutlineIcon sx={{ marginLeft: '1px' }} />} 
  sx={{ 
    ...fieldStyle,
    px: 3,
    whiteSpace: 'nowrap',
    '& .MuiButton-startIcon': {
      marginLeft: '12px !important',
      marginRight: '-4px !important',
    }
  }}
>
  افزودن
</Button>
        </Box>

        <Button type="submit" variant="contained" size="large" className="bg-indigo-600 py-3 font-bold">
          ذخیره تراکنش
        </Button>
      </form>
    </Paper>
  );
};

export default AddTransaction;