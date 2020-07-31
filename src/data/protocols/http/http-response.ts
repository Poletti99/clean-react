export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badResquest = 400,
  unathorized = 401,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};
