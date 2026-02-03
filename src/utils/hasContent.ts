import React from "react";

export const hasContent = (value: any): boolean => {
    if (value === null || value === undefined) return false;
  
    // string
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
  
    // boolean (ACF images return false)
    if (typeof value === "boolean") {
      return value === true;
    }
  
    // array (flexible, repeaters, galleries)
    if (Array.isArray(value)) {
      return value.length > 0 && value.some(hasContent);
    }
  
    // object (ACF groups)
    if (typeof value === "object") {
      return Object.values(value).some(hasContent);
    }
  
    return false;
  };
  