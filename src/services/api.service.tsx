import React from "react";

export class ApiService {
    public getBaseUrl(): string {
        if(process.env.NEXT_PUBLIC_API_ENV == 'production'){
          return process.env.NEXT_PUBLIC_WORDPRESS_URL;
        }
       else if(process.env.NEXT_PUBLIC_API_ENV == 'dev'){
        return "http://localhost/netiapps2026/wp-netiapps/";
        }
        else{
          return process.env.NEXT_PUBLIC_WORDPRESS_URL;
        }   
      }
      public getSiteUrl(): string {
        if(process.env.NEXT_PUBLIC_API_ENV == 'production'){           
          return "https://2026.netiapps.net/"; 
        }
       else if(process.env.NEXT_PUBLIC_API_ENV == 'dev'){
         return "http://localhost:3000/";
        }
        else{
          return "https://2026.netiapps.net/"; 
        }   
      }
}