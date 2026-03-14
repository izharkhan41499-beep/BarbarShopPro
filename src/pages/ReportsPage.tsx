import { useLanguage } from '@/i18n/LanguageContext';
import { demoDashboard, demoWorkers, demoServices, demoPayments } from '@/data/demoData';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Scissors } from 'lucide-react';

const ReportsPage = () => {
  const { t } = useLanguage();

  const workerPerformance = demoWorkers
    .filter(w => w.status === 'active')
    .sort((a, b) => b.todaySales - a.todaySales);

  const servicePopularity = demoServices
    .filter(s => s.active)
    .sort((a, b) => b.price - a.price);

  const methodTotals = demoPayments.reduce((acc, p) => {
    acc[p.method] = (acc[p.method] || 0) + p.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-display font-bold text-foreground">{t('reports')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="surface-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-subhead font-semibold text-foreground">{t('revenue')}</h2>
          </div>
          <p className="text-display font-bold text-foreground tabular-nums">${demoDashboard.totalRevenue.toFixed(2)}</p>
          <p className="text-caption text-success mt-1">+{demoDashboard.revenueChange}% vs last Tue</p>
        </div>
        <div className="surface-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-subhead font-semibold text-foreground">{t('profit')}</h2>
          </div>
          <p className="text-display font-bold text-foreground tabular-nums">${demoDashboard.netProfit.toFixed(2)}</p>
        </div>
        <div className="surface-card p-4">
          <h2 className="text-subhead font-semibold text-foreground mb-3">Payment Methods</h2>
          <div className="space-y-2">
            {Object.entries(methodTotals).map(([method, total]) => (
              <div key={method} className="flex justify-between text-body">
                <span className="capitalize text-muted-foreground">{method}</span>
                <span className="font-semibold tabular-nums text-foreground">${total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Worker Performance */}
        <div className="surface-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-subhead font-semibold text-foreground">{t('performance')}</h2>
          </div>
          <div className="space-y-3">
            {workerPerformance.map((worker, i) => {
              const maxSales = workerPerformance[0]?.todaySales || 1;
              const pct = (worker.todaySales / maxSales) * 100;
              return (
                <div key={worker.id}>
                  <div className="flex justify-between text-body mb-1">
                    <span className="font-medium text-foreground">{worker.name}</span>
                    <span className="font-semibold tabular-nums text-foreground">${worker.todaySales} · {worker.todayClients} clients</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Popularity */}
        <div className="surface-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Scissors className="w-5 h-5 text-primary" />
            <h2 className="text-subhead font-semibold text-foreground">{t('topServices')}</h2>
          </div>
          <div className="space-y-2">
            {servicePopularity.map(service => (
              <div key={service.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/30 transition-colors">
                <div>
                  <span className="text-body font-medium text-foreground">{service.name}</span>
                  <span className="text-caption text-muted-foreground ms-2">{service.duration}{t('minutesShort')}</span>
                </div>
                <span className="text-body font-semibold tabular-nums text-foreground">${service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
