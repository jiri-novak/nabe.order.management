import { ClassConstructor } from './../models/class.constructor';
import { HttpModel, ModelState, HttpMethod } from './../models/http.model';
import { ToasterService } from 'angular2-toaster';
import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Response, Headers, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { saveAs } from "file-saver";
import 'rxjs/Rx';

@Injectable()
export class HttpService extends Http {
    constructor(
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        private toasterService: ToasterService) {
        super(backend, defaultOptions);
    }

    /**
     * Performs a request with `get` http method.
     * @param url
     * @param cls
     * @param options: optional
     * @returns {Observable<>}
     */
    sendGet(url: string, data?: any, options?: RequestOptionsArgs): Observable<any> {
        this.requestInterceptor();
        let fullUrl = this.getFullUrl(url);
        let requestOptions = this.requestOptions(options);
        requestOptions.params = data;
        return super
            .get(fullUrl, requestOptions)
            .map(this.onMap)
            .catch(this.onCatch)
            .finally(this.onFinally);
    }

    /**
     * Performs a request with `post` http method.
     * @param url
     * @param body
     * @param cls
     * @param options
     * @returns {Observable<>}
     */
    sendPost(url: string, data?: any, options?: RequestOptionsArgs): Observable<any> {
        this.requestInterceptor();
        let fullUrl = this.getFullUrl(url);
        let requestOptions = this.requestOptions(options);
        return super
            .post(fullUrl, data, requestOptions)
            .map(this.onMap)
            .catch(this.onCatch)
            .finally(this.onFinally);
    }

    /**
     * Performs a request with `put` http method.
     * @param url
     * @param body
     * @param cls
     * @param options
     * @returns {Observable<>}
     */
    sendPut(url: string, data?: any, options?: RequestOptionsArgs): Observable<any> {
        this.requestInterceptor();
        let fullUrl = this.getFullUrl(url);
        let requestOptions = this.requestOptions(options);
        return super
            .put(fullUrl, data, requestOptions)
            .map(this.onMap)
            .catch(this.onCatch)
            .finally(this.onFinally);
    }

    /**
     * Performs a request with `delete` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    sendDelete(url: string, data?: any, options?: RequestOptionsArgs): Observable<any> {
        this.requestInterceptor();
        return super
            .delete(this.getFullUrl(url), options)
            .map(this.onMap)
            .catch(this.onCatch)
            .finally(() => { this.onFinally(); });
    }

    /**
     * Performs a request to download
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    download(method: HttpMethod, url: string, data: any, options?: RequestOptionsArgs): Observable<void> {
        let requestOptions = this.requestOptions(options);
        switch (method) {
            case HttpMethod.POST:
                return super.post(url, data, requestOptions)
                    .map(response => {
                        let blob = new Blob([response.text()]);
                        let fileName = this.getFileNameFromHttpResponse(response);
                        saveAs(blob, fileName);
                    })
                    .catch(this.onCatch)
            case HttpMethod.GET:
                requestOptions.params = data;
                return super.get(url, requestOptions)
                    .map(response => {
                        let blob = new Blob([response.text()]);
                        let fileName = this.getFileNameFromHttpResponse(response);
                        saveAs(blob, fileName);
                    })
                    .catch(this.onCatch)
                    .finally(this.onFinally);
        }
    }

    /**
     * get file name from http response
     * @param response
     * @returns {string}
     */
    private getFileNameFromHttpResponse(response): string {
        var contentDispositionHeader = response.headers.get('Content-Disposition');
        var result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
        return result.replace(/"/g, '');
    }

    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
            options.headers.append('Content-Type', `application/json`);
            // options.headers.append('Authorization', `Bearer ${iotGimoUser.token}`);
        }
        return options;
    }

    /**
     * Build API url.
     * @param url
     * @returns {string}
     */
    private getFullUrl(url: string): string {
        return url;
    }

    /**
     * Request interceptor.
     */
    private requestInterceptor(): void {

    }

    /**
     * Response interceptor.
     */
    private responseInterceptor(): void {

    }

    /**
    * Mapping handler.
    * @param response
    * @param cls
    * @returns {Observable<any>}
    */
    private onMap(response: Response): any {
        if (response.text()) {
            return response.json();
        }
        return response;
    }

    /**
     * Error handler.
     * @param error
     * @returns {Observable<any>}
     */
    private onCatch(error: Response): Observable<any> {
        if (error.status === 400 && error.text()) {
            return Observable.of(new HttpModel(false, null, ModelState.fromServerResponse(error.json())));
        }
        return Observable.throw(error);
    }

    /**
     * onSubscribeSuccess
     * @param res
     */
    private onSubscribeSuccess(res: Response): void {
    }

    /**
     * onSubscribeError
     * @param error
     */
    private onSubscribeError(error: any): void {
        this.toasterService.pop('error', 'Error', error);
    }

    /**
     * onFinally
     */
    private onFinally(): void {
        // this.responseInterceptor();
    }
}