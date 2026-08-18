import { API_CONFIG } from "../configs/apiConfig";

class BaseApiService {
  private baseUrl = API_CONFIG.baseUrl;

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Unknown error",
      }));

      throw new Error(error.message || "API Error");
    }

    return response.json();
  }

  protected get<TResponse>(url: string): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "GET",
    });
  }

  protected post<TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  protected put<TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  protected delete<TResponse>(url: string): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "DELETE",
    });
  }
}

export default BaseApiService;
