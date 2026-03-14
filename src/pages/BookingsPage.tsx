import { useLanguage } from '@/i18n/LanguageContext';
import { demoQueue } from '@/data/demoData';
import { motion } from 'framer-motion';
import { CalendarCheck, Plus } from 'lucide-react';

const statusLabel: Record<string, string> = {
  waiting: 'Waiting',
  in_progress: 'In Progress',
  done: 'Done',
  cancelled: 'Cancelled',
  no_show: 'No Show',
};

const statusStyle: Record<string, string> = {
  waiting: 'status-waiting',
  in_progress: 'status-in-progress',
  done: 'status-done',
  cancelled: 'status-cancelled',
  no_show: 'status-cancelled',
};

const BookingsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-display font-bold text-foreground">{t('bookings')}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-body font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          {t('add')}
        </button>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">#</th>
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('name')}</th>
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('services')}</th>
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('workers')}</th>
                <th className="text-center text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Source</th>
                <th className="text-center text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {demoQueue.map((booking, i) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-body font-bold tabular-nums text-muted-foreground">#{booking.queuePos}</td>
                  <td className="px-4 py-3 text-body font-medium text-foreground">{booking.customerName}</td>
                  <td className="px-4 py-3 text-body text-muted-foreground">{booking.serviceName}</td>
                  <td className="px-4 py-3 text-body text-muted-foreground">{booking.workerName}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-caption font-medium px-2 py-0.5 rounded ${booking.source === 'online' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {booking.source === 'online' ? 'Online' : 'Walk-in'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-caption font-medium px-2 py-0.5 rounded ${statusStyle[booking.status]}`}>
                      {statusLabel[booking.status]}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
