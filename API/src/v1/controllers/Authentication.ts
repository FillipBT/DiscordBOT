import { AuthResponse } from "../interfaces/Authentication"
import { Response, Request } from "express"
import { TypedRequestBody } from "../interfaces/ExpressInterfaces";
import { User } from "../../schmeas/User";

export async function Auth ( req: TypedRequestBody<{ code: string}>, res: Response) {

    console.log("Got to auth start")

    if(!req.body) return

    console.log("Found body")

    console.log(req.body)

    const client_id = process.env.CLIENT_ID as string
    const client_secret = process.env.CLIENT_SECRET as string
    const redirect_uri = process.env.REDIRECT_URI as string

    if(!client_id || !client_secret || !redirect_uri) return console.log("Could not get clientID || client secret || redirect_uri")

    console.log("CLient_ID: " + client_id + " Client Secret " + client_secret + " Redirect URI " + redirect_uri)

    const { code } =  req.body;

    if(!code) return console.log('Could not get code!')

    if(code) console.log("Got code: " + code)

    try {

        const data: BodyInit =  new URLSearchParams ({
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri,
        })

        const Header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const response = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: data,
            headers: Header,
        })

        console.log("Sent request")

        if(response) {
            const responsedata: AuthResponse = await response.json()

            console.log(responsedata)

            if(!responsedata.access_token) return

            
            const identityHeader = {
                'Authorization': 'Bearer ' + responsedata.access_token,
            }
    
            const identityResponse = await fetch('https://discord.com/api/users/@me', {
                method: 'GET',
                headers: identityHeader,
            })
            

            if(identityResponse) {
                const identityData = await identityResponse.json()

                console.log(identityData)
    
                if(await identityData) {

                    const user = await User.findOne({ userId: identityData.id})

                    if(!user) {
                        const newUser = await new User({
                            userId: await identityData.id,
                            username: await identityData.global_name,
                            token: responsedata.access_token
                        })

                        newUser.save()

                        res.send({ token: responsedata.access_token}) 


                    } else {
                        user.username = identityData.global_name
                        user.token = responsedata.access_token

                        await user.save()

                        await res.send({ token: responsedata.access_token}) 
                    }                
                }
            } else return

             
    
        } else return;
    } catch (error) {
        console.log(error)
    }

}