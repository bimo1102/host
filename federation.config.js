const params = `?version=${new Date().getTime()}`;
require('dotenv').config({ path: './.env.development' });

module.exports = {
    moduleName: 'host',
    remotes: {
        globalModule: `globalModule@${process.env.GLOBAL_MFE_URL}/remoteEntry.js${params}`,
        crmModule: `crmModule@${process.env.CRM_MFE_URL}/remoteEntry.js${params}`,
    },
};
