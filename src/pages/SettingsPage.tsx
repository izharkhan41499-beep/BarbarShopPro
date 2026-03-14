import { useLanguage } from '@/i18n/LanguageContext';
import { Globe, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

const SettingsPage = () => {
  const { t, locale, setLocale } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-display font-bold text-foreground">{t('settings')}</h1>

      {/* Language */}
      <div className="surface-card p-4">
        <h2 className="text-subhead font-semibold text-foreground mb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Language
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setLocale('en')}
            className={`px-4 py-2 rounded-lg text-body font-medium transition-colors ${locale === 'en' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
          >
            English
          </button>
          <button
            onClick={() => setLocale('ar')}
            className={`px-4 py-2 rounded-lg text-body font-medium transition-colors ${locale === 'ar' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
          >
            العربية
          </button>
        </div>
      </div>

      {/* Theme */}
      <div className="surface-card p-4">
        <h2 className="text-subhead font-semibold text-foreground mb-3">Theme</h2>
        <div className="flex gap-2">
          <button
            onClick={() => toggleTheme('light')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-body font-medium transition-colors ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
          >
            <Sun className="w-4 h-4" /> Light
          </button>
          <button
            onClick={() => toggleTheme('dark')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-body font-medium transition-colors ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
          >
            <Moon className="w-4 h-4" /> Dark
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
