import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import AppLayout from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import QueuePage from "./pages/QueuePage";
import BookingsPage from "./pages/BookingsPage";
import CustomersPage from "./pages/CustomersPage";
import WorkersPage from "./pages/WorkersPage";
import ServicesPage from "./pages/ServicesPage";
import PaymentsPage from "./pages/PaymentsPage";
import ExpensesPage from "./pages/ExpensesPage";
import InventoryPage from "./pages/InventoryPage";
import ReportsPage from "./pages/ReportsPage";
import AttendancePage from "./pages/AttendancePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/queue" element={<AppLayout><QueuePage /></AppLayout>} />
            <Route path="/bookings" element={<AppLayout><BookingsPage /></AppLayout>} />
            <Route path="/customers" element={<AppLayout><CustomersPage /></AppLayout>} />
            <Route path="/workers" element={<AppLayout><WorkersPage /></AppLayout>} />
            <Route path="/services" element={<AppLayout><ServicesPage /></AppLayout>} />
            <Route path="/payments" element={<AppLayout><PaymentsPage /></AppLayout>} />
            <Route path="/expenses" element={<AppLayout><ExpensesPage /></AppLayout>} />
            <Route path="/inventory" element={<AppLayout><InventoryPage /></AppLayout>} />
            <Route path="/reports" element={<AppLayout><ReportsPage /></AppLayout>} />
            <Route path="/attendance" element={<AppLayout><AttendancePage /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
