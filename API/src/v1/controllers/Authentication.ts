import { AuthBody } from "../interfaces/Authentication"
import { Response } from "express"
import { TypedRequestBody } from "../interfaces/ExpressInterfaces";

export async function Auth ( req: TypedRequestBody<{ code: string}>, res: Response) {

    if(!req.body) return

    const { code }: any =  req.body;

    try {

        const data: BodyInit =  new URLSearchParams ({
            'client_id': process.env.CLIENT_ID as string,
            'client_secret': process.env.CLIENT_SECRET as string,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': process.env.REDIRECT_URI as string,
        })

        const Header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const response = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: data,
            headers: Header,
        })

        if(response) {
            console.log(response)
        } else return;
    } catch (error) {
        console.log(error)
    }

}