package com.github.boardyb.gameoflife.response;

public class ResponseMessage {

    private String responseMessage;
    private Integer statusCode;
    private Object responseBody;

    public ResponseMessage() {
    }

    private ResponseMessage(String responseMessage, Integer statusCode, Object responseBody) {
        this.responseMessage = responseMessage;
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }

    public static ResponseMessage successfulResponseFor(Object responseBody) {
        return new ResponseMessage("Operation Successful", 200, responseBody);
    }

    public static ResponseMessage errorResponseFor(Object responseBody) {
        return new ResponseMessage("Operation Failed", 500, responseBody);
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public Object getResponseBody() {
        return responseBody;
    }

    public void setResponseBody(Object responseBody) {
        this.responseBody = responseBody;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("ResponseMessage{");
        sb.append("responseMessage='").append(responseMessage).append('\'');
        sb.append(", statusCode=").append(statusCode);
        sb.append(", responseBody='").append(responseBody).append('\'');
        sb.append('}');
        return sb.toString();
    }
}

