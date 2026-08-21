import { generateGuid } from "../../../../server/src/extensions/stringExtensions";
import { API_CONFIG } from "../configs/apiConfig";

class BaseApiService {
  private baseUrl = API_CONFIG.baseUrl;
  /**
   *
   */
  constructor(controller: string) {
    this.baseUrl = `${this.baseUrl}/${controller}/`;
    console.log("this.baseUrl : ", this.baseUrl);
  }
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Unknown error",
      }));

      throw new Error(error.message || "API Error");
    }

    // 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();

    // Empty response body
    if (!text) {
      return undefined as T;
    }

    return JSON.parse(text) as T;
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

  protected onCreate<TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<TResponse> {
    const requestData = {
      ...data,
      key: generateGuid(),
    };

    return this.request<TResponse>(url, {
      method: "POST",
      body: JSON.stringify(requestData),
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
