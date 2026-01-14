export class ApiService {
    getBaseUrl() {
      if (process.env.NEXT_PUBLIC_API_ENV === 'production') {
        return 'https://2026wp.netiapps.net/';
      } else if (process.env.NEXT_PUBLIC_API_ENV === 'dev') {
        return 'http://localhost/netiapps2026/wp-netiapps/';
      } else {
        return 'https://2026wp.netiapps.net/';
      }
    }
  
    getSiteUrl() {
      if (process.env.NEXT_PUBLIC_API_ENV === 'production') {
        return 'https://2026.netiapps.net/';
      } else if (process.env.NEXT_PUBLIC_API_ENV === 'dev') {
        return 'http://localhost:3000/';
      } else {
        return 'https://2026.netiapps.net/';
      }
    }
  }
  