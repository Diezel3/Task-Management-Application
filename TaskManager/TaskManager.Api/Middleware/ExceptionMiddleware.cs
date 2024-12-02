using Microsoft.AspNetCore.Http;
using System.Net;
using System.Text.Json;

namespace TaskManager.Api.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var errorResponse = new
            {
                StatusCode = response.StatusCode,
                Message = "An unexpected error occurred. Please try again later.",
                Details = exception.Message
            };

            return response.WriteAsync(JsonSerializer.Serialize(errorResponse));
        }
    }
}
