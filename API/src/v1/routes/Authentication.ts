import { Router, Request, Response, response } from 'express'
import { Auth } from '../controllers/Authentication'
import { TypedRequestBody } from '../interfaces/ExpressInterfaces'

const route = Router()

route.get('/', async (req: Request, res: Response) => {
    res.send('Got Here')
})

route.post('/', async (req: TypedRequestBody<{ code: string}>, res: Response) => {
    Auth(req, response)
})



export default route