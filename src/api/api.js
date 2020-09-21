import Axios from 'axios'

export const getAxiosInstanceJsonServer = () => {
    return Axios.create({
        baseURL: "http://localhost:3000",

    })

}

export const getAxiosInstanceAuth = () => {
    return Axios.create({
        baseURL: "https://twitterapi.liara.run/api/",

    })

}
export const getAxiosInstanceApi = () => {   //روت هایی که پراویت هستند از این روت استفاده کنند
    return Axios.create({
        baseURL: "https://twitterapi.liara.run/api/",

        headers: {
            'x-auth-token': localStorage.getItem("x-auth-token")
        }
    })

}