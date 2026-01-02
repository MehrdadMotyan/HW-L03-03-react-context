import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, 
  CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Charts = () => {
  const { transactions } = useContext(TransactionContext);

  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  const lineData = transactions.map(t => ({
    name: t.title,
    تاریخ: t.date,
    مبلغ: t.amount,
  })).reverse();

  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toLocaleString()}k`;
    return value.toLocaleString();
  };

  return (
    <Box className="flex flex-col gap-8 w-full">
      
      <Paper elevation={0} className="p-6 rounded-3xl border border-slate-200 w-full overflow-hidden">
        <Typography variant="h6" className="mb-8 font-bold text-slate-700 text-right">روند تغییرات مالی</Typography>
        <Box className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={lineData} margin={{ top: 10, right: 100, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="تاریخ" 
                tick={{fontSize: 12, fill: '#64748b'}} 
                tickMargin={15}
              />
              <YAxis 
                orientation="right" 
                tick={{
                  fontSize: 12, 
                  fill: '#64748b',
                  dx: 45,
                  textAnchor: "start"
                }} 
                width={100}
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()} تومان`, 'مبلغ']}
                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', textAlign: 'right' }} 
              />
              <Line 
                type="monotone" 
                dataKey="مبلغ" 
                stroke="#6366f1" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#6366f1', strokeWidth: 3, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      <Paper elevation={0} className="p-6 rounded-3xl border border-slate-200 w-full">
        <Typography variant="h6" className="mb-8 font-bold text-slate-700 text-right">سهم دسته‌بندی‌ها از هزینه‌ها</Typography>
        <Box className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                innerRadius={90}
                outerRadius={130}
                paddingAngle={8}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString()} تومان`} />
              <Legend 
                verticalAlign="bottom" 
                iconType="circle"
                wrapperStyle={{ paddingTop: '30px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

    </Box>
  );
};

export default Charts;