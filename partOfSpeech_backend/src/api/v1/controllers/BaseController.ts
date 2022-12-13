import { Response, Request } from 'express';
import { controller, interfaces, request, response } from 'inversify-express-utils';
import ResponseUtils from '@pbb/utils/ResponseUtils';
import { validationResult } from 'express-validator';


@controller('')
export default abstract class BaseController implements interfaces.Controller {

    constructor() {}

    protected validateRequest(@request() req: Request, @response() res: Response): boolean {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            ResponseUtils.send(res, 422, errors.array()[0].msg, errors);
            return false;
        }

        return true;
    }

}
