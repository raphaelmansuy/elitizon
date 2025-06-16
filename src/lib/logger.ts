const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export const logger = {
  debug: (message: string, data?: unknown) => {
    if (isDevelopment || isTest) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
  info: (message: string, data?: unknown) => {
    console.log(`[INFO] ${message}`, isDevelopment ? data : '');
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, isDevelopment ? data : '');
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, isDevelopment ? error : 'Error occurred');
  }
};
