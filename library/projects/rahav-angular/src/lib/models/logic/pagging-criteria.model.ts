/**
 * @description Represents a definition for search criteria on a page
 */
export interface PaggingCriteriaModel {
    /**
     * @description Limit items on the page
     */
    limit: number;
    /**
     * @description Item block number or page number
     */
    offset: number;
    /**
     * @description Clause for sorting by field
     */
    orderBy?: Array<string>;
    /**
     * @description Related objects that will be loaded together
     */
    navigation?: Array<string>;
}

export const PAGGING_CRITERIA_DEFAULT: PaggingCriteriaModel = {
    limit: 20,
    offset: 0
};

export const PAGGING_CRITERIA_MAX: PaggingCriteriaModel = {
    limit: 10000,
    offset: 0
};