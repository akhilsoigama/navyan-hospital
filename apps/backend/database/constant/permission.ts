export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard:view',

  // Vehicle Management
  VEHICLE_VIEW: 'vehicle:view',
  VEHICLE_CREATE: 'vehicle:create',
  VEHICLE_UPDATE: 'vehicle:update',
  VEHICLE_DELETE: 'vehicle:delete',

  // Driver Management
  DRIVER_VIEW: 'driver:view',
  DRIVER_CREATE: 'driver:create',
  DRIVER_UPDATE: 'driver:update',
  DRIVER_DELETE: 'driver:delete',

  // Trip Management
  TRIP_VIEW: 'trip:view',
  TRIP_CREATE: 'trip:create',
  TRIP_DISPATCH: 'trip:dispatch',
  TRIP_COMPLETE: 'trip:complete',
  TRIP_CANCEL: 'trip:cancel',

  // Maintenance
  MAINTENANCE_VIEW: 'maintenance:view',
  MAINTENANCE_CREATE: 'maintenance:create',
  MAINTENANCE_UPDATE: 'maintenance:update',
  MAINTENANCE_CLOSE: 'maintenance:close',

  // Fuel Logs
  FUEL_VIEW: 'fuel:view',
  FUEL_CREATE: 'fuel:create',
  FUEL_UPDATE: 'fuel:update',
  FUEL_DELETE: 'fuel:delete',

  // Expenses
  EXPENSE_VIEW: 'expense:view',
  EXPENSE_CREATE: 'expense:create',
  EXPENSE_UPDATE: 'expense:update',
  EXPENSE_DELETE: 'expense:delete',

  // Reports
  REPORT_VIEW: 'report:view',
  REPORT_EXPORT_PDF: 'report:export:pdf',

  // Analytics
  ANALYTICS_VIEW: 'analytics:view',

  // User Management
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
} as const;

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];