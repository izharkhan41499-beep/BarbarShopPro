import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, CalendarCheck, UserCircle, Scissors,
  CreditCard, Receipt, Package, BarChart3, Clock, Settings,
  Menu, X, Globe, ChevronLeft
} from 'lucide-react';

const navItems = [
  { key: 'dashboard' as const, icon: LayoutDashboard, path: '/' },
  { key: 'queue' as const, icon: Users, path: '/queue' },
  { key: 'bookings' as const, icon: CalendarCheck, path: '/bookings' },
  { key: 'customers' as const, icon: UserCircle, path: '/customers' },
  { key: 'workers' as const, icon: Users, path: '/workers' },
  { key: 'services' as const, icon: Scissors, path: '/services' },
  { key: 'payments' as const, icon: CreditCard, path: '/payments' },
  { key: 'expenses' as const, icon: Receipt, path: '/expenses' },
  { key: 'inventory' as const, icon: Package, path: '/inventory' },
  { key: 'reports' as const, icon: BarChart3, path: '/reports' },
  { key: 'attendance' as const, icon: Clock, path: '/attendance' },
  { key: 'settings' as const, icon: Settings, path: '/settings' },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { t, locale, setLocale, dir } = useLanguage();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background" dir={dir}>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 z-50 flex flex-col bg-card transition-all duration-200 lg:static
          ${dir === 'rtl' ? 'right-0' : 'left-0'}
          ${sidebarOpen ? 'translate-x-0' : (dir === 'rtl' ? 'translate-x-full' : '-translate-x-full')} 
          lg:translate-x-0
          ${collapsed ? 'w-[68px]' : 'w-64'}
        `}
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <span className="text-heading font-bold text-foreground tracking-tight">
              {t('shopName')}
            </span>
          )}
          {collapsed && (
            <span className="text-heading font-bold text-primary">SB</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg hover:bg-accent text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-body font-medium transition-colors
                  ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }
                  ${collapsed ? 'justify-center px-0' : ''}
                `}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{t(item.key)}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Language toggle */}
        <div className={`p-3 border-t border-border ${collapsed ? 'flex justify-center' : ''}`}>
          <button
            onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-caption font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors w-full ${collapsed ? 'justify-center px-0' : ''}`}
          >
            <Globe className="w-4 h-4 shrink-0" />
            {!collapsed && <span>{locale === 'en' ? 'العربية' : 'English'}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center h-14 px-4 lg:px-6 bg-card border-b border-border shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          {/* Sync status indicator */}
          <div className="flex items-center gap-2 text-caption text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
            <span className="hidden sm:inline">Online</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
