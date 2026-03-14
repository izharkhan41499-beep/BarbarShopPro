import { useLanguage } from '@/i18n/LanguageContext';
import { demoServices } from '@/data/demoData';
import { motion } from 'framer-motion';
import { Plus, Clock, DollarSign, MoreHorizontal } from 'lucide-react';

const ServicesPage = () => {
  const { t } = useLanguage();

  const categories = [...new Set(demoServices.map(s => s.category))];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-display font-bold text-foreground">{t('services')}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-body font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          {t('addService')}
        </button>
      </div>

      {categories.map(category => (
        <div key={category}>
          <h2 className="text-subhead font-semibold text-foreground mb-3">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {demoServices.filter(s => s.category === category).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`surface-card-hover p-4 ${!service.active ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-body font-semibold text-foreground">{service.name}</h3>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-body">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="font-semibold tabular-nums text-foreground">${service.price}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="tabular-nums text-muted-foreground">{service.duration} {t('minutesShort')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesPage;
