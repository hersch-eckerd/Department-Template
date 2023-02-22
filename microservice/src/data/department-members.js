import { integrationUtil } from '@ellucian/experience-extension-server-util';

import { logUtil } from '@ellucian/experience-extension-server-util';
const logger = logUtil.getLogger();

export async function fetchDepartmentMembers ({ apiKey, erpId, groupCode }) {
    try {
        const start = new Date();
        const ethosContext = {};

        const adrResult = await integrationUtil.get({
            apiKey,
            context: ethosContext,
            resource: 'crosswalk-rules',
            searchParams: {
                    criteria: JSON.stringify({
                        "internalCode":"WF",
                        "internalCodeGroup": groupCode
                    })
                }
            }
        );

        const adr = adrResult?.data;
        if (!adr) {
            throw new Error(`unable to fetch department members for group code:  ${groupCode}`);
        }

        logger.debug('time:', new Date().getTime() - start.getTime());
        logger.debug('Ethos GET count:', ethosContext.ethosGetCount);
        return adr;
    } catch (error) {
        logger.error('unable to fetch data sources: ', error);
        return { data: [], error: error.message };
    }
}