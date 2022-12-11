import { Response } from 'express';

export default class ResponseUtils {

    public static send(res: Response, status: number, message: string, data?: object, errors?: object) {
        
        return res.format({
            json: () => {
                res.status(status).json({
                    meta: {
                        status,
                        message: message
                    },
                    data,
                    errors
                });
            },
            default: () => {
                res.status(406).send();
            }
        });
    }

    public static created(res: Response, data: object) {
        this.send(res, 201, 'Created', data);
    }

    public static ok(res: Response, data: object) {
        this.send(res, 200, 'Ok', data);
    }

    public static unauthorized(res: Response) {
        this.send(res, 401, 'Unauthenticated')
    } 

    public static unprocessable(res: Response, message: string, errors: object) {
        this.send(res, 422, message, {}, errors)
    }

    public static badRequest(res: Response, message: string) {
        this.send(res, 400, message)
    }

    public static notFound(res: Response, message: string) {
        this.send(res, 404, message)
    }
    
}
