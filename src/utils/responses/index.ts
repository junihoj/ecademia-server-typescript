export default class APIResponse {
  statusCode: number | null;
  success: boolean | null;
  message: string | null;
  data: object | null | undefined;
  count: number | null | undefined;
  constructor(
    statusCode: number | null,
    success: boolean | null,
    message: string | null,
    data?: object | null,
    count?: number | null
  ) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
    this.count = count;
  }
}

interface IAPIResponseObject {
  statusCode: number | null;
  success: boolean | null;
  message?: string | null;
  data?: object | null | undefined;
  count?: number | null | undefined;
}
export const APIResponseObject = ({
  statusCode,
  success,
  data,
  message,
  count,
}: IAPIResponseObject) => {
  return {
    statusCode: statusCode,
    success: success,
    data: data,
    message,
    count,
  };
};
