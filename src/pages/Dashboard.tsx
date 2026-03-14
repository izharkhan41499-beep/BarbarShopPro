import { useLanguage } from '@/i18n/LanguageContext';
import { demoDashboard, demoQueue, demoWorkers, demoInventory } from '@/data/demoData';
import { motion } from 'framer-motion';
import {
  Users, DollarSign, TrendingUp, TrendingDown, CalendarCheck,
  Footprints, UserCheck, AlertTriangle, ArrowUp
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, change, prefix = '' }: {
  label: string; value: string | number; icon: React.ElementType; change?: number; prefix?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="surface-card p-4 flex items-start justify-between"
  >
    <div>
      <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-heading font-bold text-foreground mt-1 tabular-nums">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</p>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-1 text-caption font-medium ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
          {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span className="tabular-nums">{Math.abs(change)}%</span>
        </div>
      )}
    </div>
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { t } = useLanguage();
  const d = demoDashboard;
  const activeQueue = demoQueue.filter(q => q.status === 'waiting' || q.status === 'in_progress');
  const servingNow = demoQueue.filter(q => q.status === 'in_progress');
  const lowStockItems = demoInventory.filter(i => i.stock <= i.lowThreshold);

  return (
    <div className="space-y-6 max-w-7xl">
      <h1 className="text-display font-bold text-foreground">{t('dashboard')}</h1>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label={t('totalCustomers')} value={d.totalCustomers} icon={Users} />
        <StatCard label={t('totalRevenue')} value={d.totalRevenue.toFixed(2)} icon={DollarSign} change={d.revenueChange} prefix="$" />
        <StatCard label={t('totalExpenses')} value={d.totalExpenses.toFixed(2)} icon={TrendingDown} prefix="$" />
        <StatCard label={t('netProfit')} value={d.netProfit.toFixed(2)} icon={TrendingUp} prefix="$" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label={t('onlineBookings')} value={d.onlineBookings} icon={CalendarCheck} />
        <StatCard label={t('walkIns')} value={d.walkIns} icon={Footprints} />
        <StatCard label={t('activeWorkers')} value={d.activeWorkers} icon={UserCheck} />
        <StatCard label={t('pendingPayments')} value={d.pendingPayments} icon={AlertTriangle} />
      </div>

      {/* Operational */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Now Serving */}
        <div className="surface-card p-4 lg:col-span-2">
          <h2 className="text-subhead font-semibold text-foreground mb-3">{t('nowServing')}</h2>
          <div className="space-y-2">
            {servingNow.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="flex items-center justify-between p-3 bg-primary/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-subhead font-bold tabular-nums text-primary">
                    #{item.queuePos}
                  </span>
                  <div>
                    <h4 className="text-body font-semibold text-foreground">{item.customerName}</h4>
                    <p className="text-caption text-muted-foreground">{item.serviceName}</p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="text-caption font-medium text-muted-foreground">{item.workerName}</p>
                  <p className="text-caption text-primary tabular-nums">{item.startTime}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          {/* Queue Summary */}
          <div className="surface-card p-4">
            <h2 className="text-subhead font-semibold text-foreground mb-2">{t('currentQueue')}</h2>
            <p className="text-display font-bold text-primary tabular-nums">{activeQueue.length}</p>
            <p className="text-caption text-muted-foreground">
              {demoQueue.filter(q => q.status === 'waiting').length} {t('waiting')}
            </p>
          </div>

          {/* Low Stock Alerts */}
          {lowStockItems.length > 0 && (
            <div className="surface-card p-4">
              <h2 className="text-subhead font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                {t('lowInventory')}
              </h2>
              <div className="space-y-2">
                {lowStockItems.map(item => (
                  <div key={item.id} className="flex justify-between text-body">
                    <span className="text-foreground">{item.name}</span>
                    <span className="font-mono tabular-nums text-warning font-medium">{item.stock}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Worker Status */}
          <div className="surface-card p-4">
            <h2 className="text-subhead font-semibold text-foreground mb-2">{t('activeWorkers')}</h2>
            <div className="space-y-2">
              {demoWorkers.filter(w => w.status === 'active').map(worker => (
                <div key={worker.id} className="flex items-center justify-between text-body">
                  <span className="text-foreground">{worker.name}</span>
                  <span className="font-mono tabular-nums text-muted-foreground">${worker.todaySales}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
