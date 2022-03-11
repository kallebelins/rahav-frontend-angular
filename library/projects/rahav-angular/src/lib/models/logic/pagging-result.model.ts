import { BusinessResultModel } from "./business-result.model";

/**
 * @description Paging business object used to encapsulate responses
 */
export interface PaggingResultModel extends BusinessResultModel {
    /**
     * @description Pagination details
     */
    paging?: PageResultModel;
    /**
     * @description Pagination summary
     */
    summary?: SummaryResultModel;
}

/**
 * @description Represents pagination results
 */
export interface PageResultModel {
    /**
     * @description Limit items on the page
     */
    limit: number;
    /**
     * @description Page number or item block
     */
    offset: number;
    /**
     * @description Quantity of items on the current page
     */
    count: number;
}

/**
 * @description Represents a pagination summary
 */
export interface SummaryResultModel {
    /**
     * @description Total number of items
     */
    totalCount: number;
    /**
     * @description Total number of pages or item groups
     */
    totalPages: number;
}

export const PAGGING_RESULT_DEFAULT: PaggingResultModel = {
    data: [],
    paging: {
        limit: 20,
        offset: 0,
        count: 0
    },
    summary: {
        totalCount: 0,
        totalPages: 0
    }
};
