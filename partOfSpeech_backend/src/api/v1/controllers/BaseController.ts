import { Response, Request } from 'express';
import { controller, interfaces } from 'inversify-express-utils';


@controller('')
export default abstract class BaseController implements interfaces.Controller {

    constructor() {}

}
