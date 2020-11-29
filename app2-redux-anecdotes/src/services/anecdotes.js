import axios from "axios";


const anecdotesAxios = axios.create({
    baseURL: `http://127.0.0.1:3001/anecdotes`
})

const getAll = () => {
    return new Promise(async(resolve,reject) => {

        try{
            const allAnecdotesAxiosResult = await anecdotesAxios({
                method: "GET",
                url: "/"
            })

            return resolve(allAnecdotesAxiosResult.data);

        }catch(e){
            console.log(`service|anecdotes|getAll|ERROR`,e);
            if(e.response){
                return reject({
                    message: "SERVER RESPONDED WITH ERROR",
                    data: e.response.data
                })
            } else if (e.request){
                return reject({
                    message: "NO RESPONSE FROM SERVER"
                })
            } else {
                return reject({
                    message: "AN ERROR OCCURRED IN COMMUNICATING WITH THE SERVER",
                    detailedMessage: e.message || "UNKNOWN"
                })
            }
        }
    })
}

const create = (data) => {
    return new Promise(async(resolve,reject) => {

        try{
            data.votes = data.votes || 0;
            const anecdoteCreationAxiosResult = await anecdotesAxios({
                method: "POST",
                url: "/",
                data: data
            })

            return resolve(anecdoteCreationAxiosResult.data)

        }catch(e){
            console.log(`service|anecdotes|create|ERROR`,e);
            if(e.response){
                return reject({
                    message: "SERVER RESPONDED WITH ERROR",
                    data: e.response.data
                })
            } else if (e.request){
                return reject({
                    message: "NO RESPONSE FROM SERVER"
                })
            } else {
                return reject({
                    message: "AN ERROR OCCURRED IN COMMUNICATING WITH THE SERVER",
                    detailedMessage: e.message || "UNKNOWN"
                })
            }
        }
    })
}


export default {
    getAll,
    create
}