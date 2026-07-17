const { authOptions } = require('./app/api/auth/[...nextauth]/route.ts');
console.log(authOptions.callbacks.session({ session: { user: {} }, token: { role: 'super-admin' } }));
