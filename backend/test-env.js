const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('PORT:', process.env.PORT);