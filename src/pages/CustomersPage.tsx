import { useLanguage } from '@/i18n/LanguageContext';
import { demoCustomers } from '@/data/demoData';
import { motion } from 'framer-motion';
import { Plus, Search, Star, UserCircle } from 'lucide-react';
import { useState } from 'react';

const CustomersPage = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = demoCustomers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-display font-bold text-foreground">{t('customers')}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-body font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          {t('addCustomer')}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPhone')}
          className="w-full ps-10 pe-4 py-2.5 bg-card rounded-lg text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        />
      </div>

      {/* Customer List */}
      <div className="space-y-2">
        {filtered.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="surface-card-hover p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-body font-semibold text-foreground">{customer.name}</h3>
                <p className="text-caption text-muted-foreground">{customer.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-end hidden sm:block">
                <p className="text-caption text-muted-foreground">{t('visits')}</p>
                <p className="text-body font-semibold tabular-nums text-foreground">{customer.visits}</p>
              </div>
              <div className="text-end hidden md:block">
                <p className="text-caption text-muted-foreground">{t('loyaltyPoints')}</p>
                <p className="text-body font-semibold tabular-nums text-primary flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> {customer.loyaltyPoints}
                </p>
              </div>
              <div className="text-end hidden lg:block">
                <p className="text-caption text-muted-foreground">{t('preferredBarber')}</p>
                <p className="text-body text-foreground">{customer.preferredBarber || '—'}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
