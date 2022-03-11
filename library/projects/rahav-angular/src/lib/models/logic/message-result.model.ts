/**
 * @description Reply message template
 */
export interface MessageResultModel {
    /**
     * @description Reference key
     */
    key: string;
    /**
     * @description Message to user
     */
    message: string;
    /**
     * @description User feedback type
     */
    type: any;
    /**
     * @description User feedback type code
     */
    typeCode: number;
}