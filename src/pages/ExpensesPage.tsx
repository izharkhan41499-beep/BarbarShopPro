import { useLanguage } from '@/i18n/LanguageContext';
import { demoExpenses } from '@/data/demoData';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const ExpensesPage = () => {
  const { t } = useLanguage();
  const total = demoExpenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-display font-bold text-foreground">{t('expenses')}</h1>
        <div className="flex items-center gap-3">
          <div className="surface-card px-4 py-2 text-body font-semibold text-foreground tabular-nums">
            {t('total')}: ${total.toFixed(2)}
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-body font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            {t('addExpense')}
          </button>
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('expenseCategory')}</th>
                <th className="text-end text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('amount')}</th>
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('date')}</th>
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('notes')}</th>
              </tr>
            </thead>
            <tbody>
              {demoExpenses.map((expense, i) => (
                <motion.tr
                  key={expense.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-4 py-3 text-body font-medium text-foreground">{expense.category}</td>
                  <td className="px-4 py-3 text-body font-semibold text-foreground tabular-nums text-end">${expense.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-body text-muted-foreground tabular-nums">{expense.date}</td>
                  <td className="px-4 py-3 text-body text-muted-foreground">{expense.notes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
