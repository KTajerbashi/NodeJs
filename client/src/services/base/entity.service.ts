import { generateGuid } from "../../../../server/src/extensions/stringExtensions";
import BaseApiService from "./base.api.service";

export default class EntityService extends BaseApiService {
  constructor(controller: string) {
    super(controller);
  }

  public onCreate<TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<IApiResponse<TResponse>> {
    const requestData = {
      ...data,
      key: generateGuid(),
    };

    return this.post<TRequest, TResponse>(url, requestData);
  }

  public onReadById<TResponse>(id: string): Promise<IApiResponse<TResponse>> {
    return this.get<TResponse>(id);
  }

  public onReadAll<TResponse>(
    url: string = "",
  ): Promise<IApiResponse<TResponse>> {
    return this.get<TResponse>(url);
  }

  public onUpdate<TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<IApiResponse<TResponse>> {
    return this.put<TRequest, TResponse>(url, data);
  }

  public onDelete<TResponse>(
    url: string,
  ): Promise<IApiResponse<TResponse> | undefined> {
    return this.delete<TResponse>(url);
  }
}
