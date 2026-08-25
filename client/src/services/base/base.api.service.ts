import { API_CONFIG } from "../configs/apiConfig";
import alertService from "../configs/alertService";

export default class BaseApiService {
  private baseUrl = API_CONFIG.baseUrl;

  constructor(controller: string) {
    this.baseUrl = `${this.baseUrl}/${controller}/`;
  }

  private async request<T>(
    url: string,
    options?: RequestInit,
  ): Promise<IApiResponse<T>> {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
          ...options?.headers,
        },
      });

      console.log("[response]", response);

      // ============================================
      // Successful response
      // ============================================
      if (response.ok) {
        // 204 No Content
        if (response.status === 204) {
          return {
            isSuccess: true,
            data: undefined as T,
            message: "Operation completed successfully.",
          };
        }
        const data = await response.json();
        return {
          isSuccess: true,
          data: data,
          message: "successfully completed.",
        } as IApiResponse<T>;
      }

      // ============================================
      // Backend error response
      // ============================================
      const errorBody = await response.json().catch(() => null);

      const message = errorBody?.message ?? "An unexpected error occurred.";

      switch (response.status) {
        case 400: {
          const errorMessage = message ?? "درخواست نامعتبر است.";

          alertService.error(errorMessage, "Bad Request");

          throw new Error(errorMessage);
        }

        case 401: {
          const errorMessage = message ?? "احراز هویت انجام نشده است.";

          localStorage.removeItem("accessToken");

          alertService.error(errorMessage, "Unauthorized");

          throw new Error(errorMessage);
        }

        case 403: {
          const errorMessage =
            message ?? "شما دسترسی لازم برای انجام این عملیات را ندارید.";

          alertService.error(errorMessage, "Access Denied");

          throw new Error(errorMessage);
        }

        case 404: {
          const errorMessage = message ?? "منبع مورد نظر پیدا نشد.";

          alertService.error(errorMessage, "Not Found");

          throw new Error(errorMessage);
        }

        case 409: {
          const errorMessage =
            message ?? "این درخواست با وضعیت فعلی سیستم تداخل دارد.";

          alertService.error(errorMessage, "Conflict");

          throw new Error(errorMessage);
        }

        case 422: {
          const errorMessage = message ?? "اطلاعات ارسال شده معتبر نیست.";

          alertService.error(errorMessage, "Validation Error");

          throw new Error(errorMessage);
        }

        case 500: {
          const errorMessage = message ?? "خطای داخلی سرور رخ داده است.";

          alertService.error(errorMessage, "Server Error");

          throw new Error(errorMessage);
        }

        case 502:
        case 503:
        case 504: {
          const errorMessage =
            message ??
            "سرور در حال حاضر در دسترس نیست. لطفاً دوباره تلاش کنید.";

          alertService.error(errorMessage, "Server Unavailable");

          throw new Error(errorMessage);
        }

        default: {
          const errorMessage = message ?? `خطای HTTP: ${response.status}`;

          alertService.error(errorMessage, `HTTP ${response.status}`);

          throw new Error(errorMessage);
        }
      }
    } catch (error) {
      // ============================================
      // Network / fetch error
      // ============================================
      if (error instanceof TypeError) {
        alertService.error(
          "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت یا وضعیت سرور را بررسی کنید.",
          "Connection Error",
        );
      }
      console.log("[error]", error);
      throw error;
    }
  }

  protected get<TResponse>(url: string): Promise<IApiResponse<TResponse>> {
    return this.request<TResponse>(url, {
      method: "GET",
    });
  }

  protected post<TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<IApiResponse<TResponse>> {
    return this.request<TResponse>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  protected put<TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<IApiResponse<TResponse>> {
    return this.request<TResponse>(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  protected async delete<TResponse>(
    url: string,
  ): Promise<IApiResponse<TResponse> | undefined> {
    const result = await alertService.confirm("Delete Record!");

    if (!result.isConfirmed) {
      return undefined;
    }

    return this.request<TResponse>(url, {
      method: "DELETE",
    });
  }
}
