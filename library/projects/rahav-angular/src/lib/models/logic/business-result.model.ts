import { MessageResultModel } from "./message-result.model";

/**
 * @description Business object used to encapsulate response to requests
 */
export interface BusinessResultModel {
    /**
     * @description Encapsulated model data list
     */
    data?: any;
    /**
     * @description Business messages for user feedback
     */
    messages?: Array<MessageResultModel>;
    /**
     * @description Indicates if you have an error message
     */
    hasErrors?: boolean;
    /**
     * @description Transaction reference token
     */
    token?: string;
}