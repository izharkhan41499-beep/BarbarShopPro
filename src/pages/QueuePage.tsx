import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { demoQueue, demoWorkers, type QueueItem } from '@/data/demoData';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, SkipForward, Plus, ArrowRightLeft } from 'lucide-react';

const statusStyles: Record<string, string> = {
  waiting: 'status-waiting',
  in_progress: 'status-in-progress',
  done: 'status-done',
  cancelled: 'status-cancelled',
  no_show: 'status-cancelled',
};

const QueuePage = () => {
  const { t } = useLanguage();
  const [queue, setQueue] = useState<QueueItem[]>(demoQueue);
  const activeWorkers = demoWorkers.filter(w => w.status === 'active');

  const handleStart = (id: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'in_progress' as const, waitTime: 0, startTime: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }) } : q));
  };

  const handleFinish = (id: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'done' as const } : q));
  };

  const handleSkip = (id: string) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'no_show' as const } : q));
  };

  const activeQueue = queue.filter(q => q.status === 'waiting' || q.status === 'in_progress');

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-display font-bold text-foreground">{t('queue')}</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-body font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          {t('addToQueue')}
        </button>
      </div>

      {/* Worker queues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {activeWorkers.map(worker => {
          const workerQueue = activeQueue.filter(q => q.workerId === worker.id);
          const serving = workerQueue.find(q => q.status === 'in_progress');

          return (
            <div key={worker.id} className="surface-card overflow-hidden">
              {/* Worker header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-subhead font-semibold text-foreground">{worker.name}</h3>
                  <span className="text-caption font-medium text-muted-foreground tabular-nums">
                    {workerQueue.length} {t('waiting')}
                  </span>
                </div>
                {serving && (
                  <div className="mt-2 p-2.5 bg-primary/5 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-caption font-medium text-primary uppercase tracking-wider">{t('nowServing')}</p>
                      <p className="text-body font-semibold text-foreground">#{serving.queuePos} {serving.customerName}</p>
                    </div>
                    <button
                      onClick={() => handleFinish(serving.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-success text-success-foreground rounded-lg text-caption font-medium hover:bg-success/90 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {t('finishService')}
                    </button>
                  </div>
                )}
              </div>

              {/* Queue items */}
              <div className="p-2">
                <AnimatePresence>
                  {workerQueue.filter(q => q.status === 'waiting').map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-body font-bold tabular-nums text-muted-foreground">
                          #{item.queuePos}
                        </span>
                        <div>
                          <h4 className="text-body font-medium text-foreground">{item.customerName}</h4>
                          <p className="text-caption text-muted-foreground">{item.serviceName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-caption font-medium tabular-nums text-warning me-2">
                          {item.waitTime}{t('minutesShort')}
                        </span>
                        <button
                          onClick={() => handleStart(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title={t('startService')}
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleSkip(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          title={t('skipCustomer')}
                        >
                          <SkipForward className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {workerQueue.filter(q => q.status === 'waiting').length === 0 && !serving && (
                  <p className="text-caption text-muted-foreground text-center py-4">{t('noData')}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QueuePage;
