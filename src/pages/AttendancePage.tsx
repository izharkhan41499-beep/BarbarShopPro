import { useLanguage } from '@/i18n/LanguageContext';
import { demoAttendance, demoWorkers } from '@/data/demoData';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

const AttendancePage = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-display font-bold text-foreground">{t('attendance')}</h1>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-start text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('workerName')}</th>
                <th className="text-center text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Check In</th>
                <th className="text-center text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Check Out</th>
                <th className="text-center text-caption font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {demoAttendance.map((record, i) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-4 py-3 text-body font-medium text-foreground">{record.workerName}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-body tabular-nums text-foreground">{record.checkIn}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-body tabular-nums text-muted-foreground">{record.checkOut || '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {record.late ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded status-waiting text-caption font-medium">
                        <AlertCircle className="w-3 h-3" /> Late
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded status-done text-caption font-medium">
                        <CheckCircle className="w-3 h-3" /> On time
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
              {/* Absent workers */}
              {demoWorkers.filter(w => w.status === 'active' && !demoAttendance.find(a => a.workerId === w.id)).map((worker) => (
                <tr key={worker.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-body font-medium text-foreground">{worker.name}</td>
                  <td className="px-4 py-3 text-center text-body text-muted-foreground">—</td>
                  <td className="px-4 py-3 text-center text-body text-muted-foreground">—</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded status-cancelled text-caption font-medium">
                      Absent
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
