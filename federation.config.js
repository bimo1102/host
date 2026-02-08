const params = `?version=${new Date().getTime()}`;
require('dotenv').config({ path: './.env.development' });

module.exports = {
    moduleName: 'host',
    remotes: {
        host: `host@${process.env.HOST_URL}/remoteEntry.js`,
        warranty: `warranty@${process.env.WARRANTY_MFE_URL}/remoteEntry.js${params}`,
    },
    exposes: {
        './store': '@/redux/store.tsx',
    },
};
