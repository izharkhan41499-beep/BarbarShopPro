import { useLanguage } from '@/i18n/LanguageContext';
import { demoInventory } from '@/data/demoData';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle } from 'lucide-react';

const InventoryPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-display font-bold text-foreground">{t('inventory')}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-body font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          {t('addProduct')}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {demoInventory.map((item, i) => {
          const isLow = item.stock <= item.lowThreshold;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`surface-card-hover p-4 ${isLow ? 'ring-1 ring-warning/30' : ''}`}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-body font-semibold text-foreground">{item.name}</h3>
                {isLow && <AlertTriangle className="w-4 h-4 text-warning shrink-0" />}
              </div>
              <p className="text-caption text-muted-foreground mt-1">{item.supplier}</p>

              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-caption text-muted-foreground">{t('stock')}</p>
                  <p className={`text-subhead font-bold tabular-nums ${isLow ? 'text-warning' : 'text-foreground'}`}>
                    {item.stock}
                  </p>
                </div>
                <div className="text-end">
                  <p className="text-caption text-muted-foreground">{t('cost')}</p>
                  <p className="text-body font-semibold text-foreground tabular-nums">${item.cost.toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryPage;
