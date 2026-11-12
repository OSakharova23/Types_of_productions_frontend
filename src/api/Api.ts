/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type LikeDto = object;

export type RegisterUserDto = object;

export type LoginUserDto = object;

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Production Types API
 * @version 1.0
 * @contact
 *
 * Документация REST API для лабораторных работ
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Production Types
     * @name ProductionTypesControllerGetList
     * @summary Получение списка опубликованных типов производств с фильтрацией по норме выхода
     * @request GET:/api/production_types
     */
    productionTypesControllerGetList: (
      query?: {
        max_rate?: number;
        min_rate?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<object[], any>({
        path: `/api/production_types`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Production Types
     * @name ProductionTypesControllerCreateService
     * @summary Создание черновика
     * @request POST:/api/production_types
     * @secure
     */
    productionTypesControllerCreateService: (
      data: {
        craft_title: string;
        /** @format binary */
        image?: File | null;
        /** @format binary */
        video?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<LikeDto, any>({
        path: `/api/production_types`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Production Types
     * @name ProductionTypesControllerGetFeed
     * @summary Получение ленты с поддержкой параметров id и next=true
     * @request GET:/api/production_types/feed
     */
    productionTypesControllerGetFeed: (
      query: {
        id: string;
        next: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<LikeDto, any>({
        path: `/api/production_types/feed`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Production Types
     * @name ProductionTypesControllerGetDraft
     * @summary Получение черновика текущего пользователя
     * @request GET:/api/production_types/draft
     * @secure
     */
    productionTypesControllerGetDraft: (params: RequestParams = {}) =>
      this.request<LikeDto, any>({
        path: `/api/production_types/draft`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Production Types
     * @name ProductionTypesControllerPublishService
     * @summary Публикация черновика и дозаполнение полей
     * @request PUT:/api/production_types/{id}/publish
     * @secure
     */
    productionTypesControllerPublishService: (
      id: number,
      data: {
        craft_title?: string | null;
        description?: string | null;
        production_output_rate?: number | null;
        defect_waste_quantity?: number | null;
        /** @format binary */
        image?: File | null;
        /** @format binary */
        video?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<LikeDto, any>({
        path: `/api/production_types/${id}/publish`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Production Types
     * @name ProductionTypesControllerDeleteService
     * @summary Мягкое удаление своей карточки типа производства
     * @request DELETE:/api/production_types/{id}
     * @secure
     */
    productionTypesControllerDeleteService: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/production_types/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Production Types
     * @name ProductionTypesControllerHandleLike
     * @summary Поставить/отменить лайк (action: 1 — поставить, 0 — отменить)
     * @request POST:/api/production_types/{id}/like
     * @secure
     */
    productionTypesControllerHandleLike: (
      id: number,
      data: LikeDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/production_types/${id}/like`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRegister
     * @summary Регистрация нового пользователя
     * @request POST:/api/users/register
     */
    usersControllerRegister: (
      data: RegisterUserDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerLogin
     * @summary Аутентификация пользователя (создание сессии)
     * @request POST:/api/users/login
     */
    usersControllerLogin: (data: LoginUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerLogout
     * @summary Выход из аккаунта (удаление сессии)
     * @request POST:/api/users/logout
     * @secure
     */
    usersControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
}
