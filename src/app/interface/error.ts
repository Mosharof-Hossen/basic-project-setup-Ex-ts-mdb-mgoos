export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TReturnErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};
