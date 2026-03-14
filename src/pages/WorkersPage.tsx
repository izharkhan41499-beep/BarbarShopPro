import { useLanguage } from '@/i18n/LanguageContext';
import { demoWorkers } from '@/data/demoData';
import { motion } from 'framer-motion';
import { Plus, MoreHorizontal, UserCircle } from 'lucide-react';

const WorkersPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-display font-bold text-foreground">{t('workers')}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-body font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          {t('addWorker')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {demoWorkers.map((worker, i) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="surface-card-hover p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-body font-semibold text-foreground">{worker.name}</h3>
                  <p className="text-caption text-muted-foreground">{worker.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-caption font-medium ${worker.status === 'active' ? 'status-done' : 'status-cancelled'}`}>
                  {t(worker.status)}
                </span>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-caption text-muted-foreground">{t('salary')}</p>
                <p className="text-body font-semibold text-foreground tabular-nums">
                  ${worker.salaryAmount}
                </p>
              </div>
              <div>
                <p className="text-caption text-muted-foreground">{t('commission')}</p>
                <p className="text-body font-semibold text-foreground tabular-nums">
                  {worker.commissionPct}%
                </p>
              </div>
              <div>
                <p className="text-caption text-muted-foreground">{t('today')}</p>
                <p className="text-body font-semibold text-primary tabular-nums">
                  ${worker.todaySales}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkersPage;
