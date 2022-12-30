import { UserLoginApi, UserRegisterApi } from "../types/users";
import { triggerToast } from "../utils/notification";

const API_BASE_URL = "http://localhost:8000/api/"

type RequestMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT'

const request = async (endpoint: string, method:RequestMethod = 'GET', data:any = {}, returnData:boolean = true)=>{

    let url;
    let payload;
    if(method === 'GET')
    {
        const requestParams = data ? `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}`:""
        url = `${API_BASE_URL}${endpoint}${requestParams}`
        payload = null
    } else {
        url = `${API_BASE_URL}${endpoint}`
        payload = data? JSON.stringify(data) : null;
    }

    // Basic Authentication
    // const auth = "BASIC " + window.btoa("extreme:Ishan@2605");

    // Token Based Authentication
    const token = localStorage.getItem("token");
    let auth = token ? "Token " + token : "";

    if(!token && endpoint === "user/me")
        return

    let response
    if(token)
    {
        response = await fetch(
            url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: auth,
            },

            body: (method !== 'GET') ? payload : null
            
        })
    }
    else
    {
        response = await fetch(
            url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },

            body: (method !== 'GET') ? payload : null
            
        })
    }
    
    if(response.ok) {
        
        if(returnData)
        {
            const json = await response.json();
            return json;
        }
    } 
    else {
        
        let errorJson = null
        try{
            errorJson = await response.json()
        }
        catch
        {
            triggerToast("error", "Something went wrong")
            throw Error("Something went wrong")
        }
        
        if(errorJson)
        {
            Object.values(errorJson).forEach((errors:any)=>{
                errors.forEach((error:string)=>{
                    triggerToast("error", error)
                })
            })
            throw Error(errorJson);
        }

    }
} 

export const register = (user:UserRegisterApi)=> {
    return request('user/register/', 'POST', user)
}

export const login = (user:UserLoginApi)=> {
    return request('token', 'POST', user)
}

export const me = ()=>{
    return request('user/me', 'GET')
}

export const addFriend = (friend:string)=>{
    return request("create-friend/", 'POST', {friend:friend})
}

export const listFriends = ()=>{
    return request("list-friends/", "GET")
}