import { AggregatePaginateResult } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

interface IDefaultResponse {
    status: boolean;
    statusCode: StatusCodes;
}

interface ICommonMessageResponse<T = unknown> extends IDefaultResponse {
    message: string;
    data?: T;
}

interface ICommonDataResponse<T> extends IDefaultResponse {
    data: T;
}

interface ICommonAggregateResponse<T> extends IDefaultResponse {
    data: AggregatePaginateResult<T>;
}

export {
    ICommonDataResponse,
    ICommonMessageResponse,
    ICommonAggregateResponse
};
