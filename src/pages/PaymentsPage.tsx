import { useLanguage } from '@/i18n/LanguageContext';
import { demoPayments } from '@/data/demoData';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, Wallet } from 'lucide-react';

const methodIcons = { cash: Banknote, card: CreditCard, wallet: Wallet };

const PaymentsPage = () => {
  const { t } = useLanguage();
  const total = demoPayments.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-display font-bold text-foreground">{t('payments')}</h1>
        <div className="surface-card px-4 py-2 text-body font-semibold text-foreground tabular-nums">
          {t('total')}: ${total.toFixed(2)}
        </div>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('name')}</th>
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('services')}</th>
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('workers')}</th>
                <th className="text-end text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('amount')}</th>
                <th className="text-center text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('method')}</th>
              </tr>
            </thead>
            <tbody>
              {demoPayments.map((payment, i) => {
                const MethodIcon = methodIcons[payment.method];
                return (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-body font-medium text-foreground">{payment.customerName}</td>
                    <td className="px-4 py-3 text-body text-muted-foreground">{payment.service}</td>
                    <td className="px-4 py-3 text-body text-muted-foreground">{payment.worker}</td>
                    <td className="px-4 py-3 text-body font-semibold text-foreground tabular-nums text-end">${payment.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-muted text-caption font-medium text-muted-foreground">
                        <MethodIcon className="w-3.5 h-3.5" />
                        {t(payment.method)}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
