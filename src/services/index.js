import { useHistory } from "react-router-dom";

const BASEURL = "http://127.0.0.1:3200";

export async function ApiService (url, type, requestData=null, headers=null) {
    //const history = useHistory();

    const options = {
        method: type,
    }
    if (headers) {
        options.headers = headers
    } else {
        options.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("at")}`
        }
    }
    if (requestData) {
        options.body = requestData;
    }
    const data = await fetch(`${BASEURL}/${url}`, options)
                        .then(res => res.json())
    if(data.statusCode==401)
    {
        console.log("in unauthorized")
        localStorage.removeItem('at');
        //history.push('/login');
        window.location.href=window.location.origin;
    }

    return data;
}