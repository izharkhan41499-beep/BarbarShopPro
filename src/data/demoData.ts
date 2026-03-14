// Demo data for the barber shop management system

export const demoWorkers = [
  { id: '1', name: 'Alex Johnson', phone: '+1-555-0101', role: 'barber', status: 'active' as const, image: null, salaryType: 'hybrid' as const, salaryAmount: 2000, commissionPct: 20, hireDate: '2023-01-15', todaySales: 320, todayClients: 8 },
  { id: '2', name: 'Marcus Rivera', phone: '+1-555-0102', role: 'barber', status: 'active' as const, image: null, salaryType: 'commission' as const, salaryAmount: 0, commissionPct: 35, hireDate: '2023-06-01', todaySales: 280, todayClients: 7 },
  { id: '3', name: 'Jamal Williams', phone: '+1-555-0103', role: 'barber', status: 'active' as const, image: null, salaryType: 'monthly' as const, salaryAmount: 3000, commissionPct: 0, hireDate: '2022-09-10', todaySales: 240, todayClients: 6 },
  { id: '4', name: 'David Chen', phone: '+1-555-0104', role: 'barber', status: 'inactive' as const, image: null, salaryType: 'daily' as const, salaryAmount: 150, commissionPct: 10, hireDate: '2024-02-20', todaySales: 0, todayClients: 0 },
];

export const demoCustomers = [
  { id: '1', name: 'Mike Thompson', phone: '+1-555-1001', email: 'mike@email.com', visits: 24, loyaltyPoints: 240, preferredBarber: 'Alex Johnson', lastVisit: '2024-01-14' },
  { id: '2', name: 'James Wilson', phone: '+1-555-1002', email: null, visits: 12, loyaltyPoints: 120, preferredBarber: 'Marcus Rivera', lastVisit: '2024-01-13' },
  { id: '3', name: 'Robert Brown', phone: '+1-555-1003', email: 'rob@email.com', visits: 36, loyaltyPoints: 360, preferredBarber: 'Alex Johnson', lastVisit: '2024-01-14' },
  { id: '4', name: 'Chris Davis', phone: '+1-555-1004', email: null, visits: 8, loyaltyPoints: 80, preferredBarber: 'Jamal Williams', lastVisit: '2024-01-12' },
  { id: '5', name: 'Kevin Martinez', phone: '+1-555-1005', email: 'kevin@email.com', visits: 15, loyaltyPoints: 150, preferredBarber: 'Marcus Rivera', lastVisit: '2024-01-14' },
  { id: '6', name: 'Daniel Lee', phone: '+1-555-1006', email: null, visits: 3, loyaltyPoints: 30, preferredBarber: null, lastVisit: '2024-01-10' },
];

export const demoServices = [
  { id: '1', name: 'Classic Haircut', price: 35, duration: 30, category: 'Hair', active: true },
  { id: '2', name: 'Beard Trim', price: 20, duration: 15, category: 'Beard', active: true },
  { id: '3', name: 'Hair Wash', price: 15, duration: 15, category: 'Hair', active: true },
  { id: '4', name: 'Facial', price: 40, duration: 30, category: 'Skin', active: true },
  { id: '5', name: 'Hair Coloring', price: 60, duration: 45, category: 'Hair', active: true },
  { id: '6', name: 'Hot Towel Shave', price: 30, duration: 25, category: 'Beard', active: true },
  { id: '7', name: 'Kids Haircut', price: 25, duration: 20, category: 'Hair', active: true },
  { id: '8', name: 'Head Massage', price: 20, duration: 15, category: 'Relaxation', active: false },
];

export type QueueStatus = 'waiting' | 'in_progress' | 'done' | 'cancelled' | 'no_show';
export type BookingSource = 'walk_in' | 'online';

export interface QueueItem {
  id: string;
  queuePos: number;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  workerName: string;
  workerId: string;
  status: QueueStatus;
  source: BookingSource;
  waitTime: number;
  startTime: string | null;
  createdAt: string;
}

export const demoQueue: QueueItem[] = [
  { id: 'q1', queuePos: 21, customerName: 'Robert Brown', customerPhone: '+1-555-1003', serviceName: 'Classic Haircut', workerName: 'Alex Johnson', workerId: '1', status: 'in_progress', source: 'walk_in', waitTime: 0, startTime: '10:30', createdAt: '10:15' },
  { id: 'q2', queuePos: 22, customerName: 'Mike Thompson', customerPhone: '+1-555-1001', serviceName: 'Beard Trim', workerName: 'Alex Johnson', workerId: '1', status: 'waiting', source: 'online', waitTime: 12, startTime: null, createdAt: '10:20' },
  { id: 'q3', queuePos: 23, customerName: 'Kevin Martinez', customerPhone: '+1-555-1005', serviceName: 'Classic Haircut', workerName: 'Marcus Rivera', workerId: '2', status: 'in_progress', source: 'walk_in', waitTime: 0, startTime: '10:25', createdAt: '10:10' },
  { id: 'q4', queuePos: 24, customerName: 'James Wilson', customerPhone: '+1-555-1002', serviceName: 'Hair Coloring', workerName: 'Marcus Rivera', workerId: '2', status: 'waiting', source: 'online', waitTime: 25, startTime: null, createdAt: '10:35' },
  { id: 'q5', queuePos: 25, customerName: 'Chris Davis', customerPhone: '+1-555-1004', serviceName: 'Classic Haircut', workerName: 'Jamal Williams', workerId: '3', status: 'in_progress', source: 'walk_in', waitTime: 0, startTime: '10:20', createdAt: '10:05' },
  { id: 'q6', queuePos: 26, customerName: 'Daniel Lee', customerPhone: '+1-555-1006', serviceName: 'Beard Trim', workerName: 'Jamal Williams', workerId: '3', status: 'waiting', source: 'walk_in', waitTime: 8, startTime: null, createdAt: '10:40' },
];

export const demoPayments = [
  { id: 'p1', customerName: 'John Smith', service: 'Classic Haircut', amount: 35, method: 'cash' as const, date: '2024-01-14', worker: 'Alex Johnson' },
  { id: 'p2', customerName: 'Tom Harris', service: 'Beard Trim + Haircut', amount: 55, method: 'card' as const, date: '2024-01-14', worker: 'Marcus Rivera' },
  { id: 'p3', customerName: 'Steve Clark', service: 'Hair Coloring', amount: 60, method: 'card' as const, date: '2024-01-14', worker: 'Alex Johnson' },
  { id: 'p4', customerName: 'Paul Walker', service: 'Classic Haircut', amount: 35, method: 'wallet' as const, date: '2024-01-14', worker: 'Jamal Williams' },
  { id: 'p5', customerName: 'Eric Young', service: 'Facial', amount: 40, method: 'cash' as const, date: '2024-01-14', worker: 'Marcus Rivera' },
];

export const demoExpenses = [
  { id: 'e1', category: 'Supplies', amount: 150, date: '2024-01-14', notes: 'Shampoo and conditioner restock' },
  { id: 'e2', category: 'Rent', amount: 2500, date: '2024-01-01', notes: 'Monthly rent' },
  { id: 'e3', category: 'Utilities', amount: 320, date: '2024-01-05', notes: 'Electricity bill' },
  { id: 'e4', category: 'Maintenance', amount: 75, date: '2024-01-10', notes: 'Chair repair' },
  { id: 'e5', category: 'Supplies', amount: 200, date: '2024-01-12', notes: 'Razor blades and towels' },
];

export const demoInventory = [
  { id: 'i1', name: 'Razor Blades', stock: 45, cost: 0.5, supplier: 'BarberPro Supply', lowThreshold: 20 },
  { id: 'i2', name: 'Shampoo (L)', stock: 8, cost: 12, supplier: 'HairCare Direct', lowThreshold: 5 },
  { id: 'i3', name: 'Hair Gel', stock: 3, cost: 8, supplier: 'BarberPro Supply', lowThreshold: 5 },
  { id: 'i4', name: 'Towels', stock: 50, cost: 3, supplier: 'CleanLinens Co', lowThreshold: 15 },
  { id: 'i5', name: 'Aftershave', stock: 12, cost: 15, supplier: 'HairCare Direct', lowThreshold: 5 },
  { id: 'i6', name: 'Clipper Oil', stock: 2, cost: 6, supplier: 'BarberPro Supply', lowThreshold: 3 },
];

export const demoAttendance = [
  { id: 'a1', workerId: '1', workerName: 'Alex Johnson', date: '2024-01-14', checkIn: '08:55', checkOut: null, late: false },
  { id: 'a2', workerId: '2', workerName: 'Marcus Rivera', date: '2024-01-14', checkIn: '09:10', checkOut: null, late: true },
  { id: 'a3', workerId: '3', workerName: 'Jamal Williams', date: '2024-01-14', checkIn: '08:50', checkOut: null, late: false },
];

export const demoDashboard = {
  totalCustomers: 23,
  totalRevenue: 1420.50,
  totalExpenses: 345,
  netProfit: 1075.50,
  onlineBookings: 8,
  walkIns: 15,
  activeWorkers: 3,
  pendingPayments: 2,
  revenueChange: 12,
};
