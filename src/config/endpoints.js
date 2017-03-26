import envConfig from 'envConfig';

const MAIN_APP_AUTHORITY = envConfig.MAIN_APP_AUTHORITY;

export default {
    // ////////////////////////// API ENDPOINTS ///////////////////////////////

    /**
     * Path used to fetch Basic Info about User
     */
    USER_BASIC_INFO_ENDPOINT: `${MAIN_APP_AUTHORITY}/user/basic-info`,

    /**
     * Path used to fetch all pojects
     */
    PROJECTS_ENDPOINT: `${MAIN_APP_AUTHORITY}/projects`,

    /**
     * Path used for CRUD manipulation with projects
     */
    PROJECT_ENDPOINT: `${MAIN_APP_AUTHORITY}/project`,

    /**
     * Path used for fetching logs
     */
    LOGS_ENDPOINT: `${MAIN_APP_AUTHORITY}/logs`,

    /**
     * Path used for fetching running loger
     */
    RUNNING_LOG_ENDPOINT: `${MAIN_APP_AUTHORITY}/running-log`,

    /**
     * Path used for CRUD manipulation with logs
     */
    LOG_ENDPOINT: `${MAIN_APP_AUTHORITY}/log`,


};
