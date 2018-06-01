
export class ResponseMessage {
  responseMessage: string;
  statusCode: number;
  responseBody: any;

  public static deserialize(obj: any, type: any): ResponseMessage {
    const responseMessage = this.createEmptyResponseMessage();
    responseMessage.responseMessage = obj.responseMessage;
    responseMessage.statusCode = obj.statusCode;
    responseMessage.responseBody = type.deserialize(obj.responseBody);
    return responseMessage;
  }

  public static createEmptyResponseMessage(): ResponseMessage {
    return new ResponseMessage(null, null, null);
  }

  constructor(responseMessage: string, statusCode: number, responseBody: any) {
    this.responseMessage = responseMessage;
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}
