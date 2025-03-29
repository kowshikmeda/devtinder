
console.log("port mode:",import.meta.env.MODE);
export const BASE_URL = import.meta.env.MODE==="development"?"http://localhost:3000":"";