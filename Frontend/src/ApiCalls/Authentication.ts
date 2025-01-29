const mainUrl="http://localhost:3000/api/"
const apiVersion="1"



export async function CodeGrant (code: string) {

    console.log("Code grant")

    const response = await fetch(`${mainUrl}v${apiVersion}/authentication`, {
        method: "POST",
        body: JSON.stringify({ code: code }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    console.log("Sending request")

    if(!response) {
        console.log("Request failed")
    }

    if(response) console.log(response)
}