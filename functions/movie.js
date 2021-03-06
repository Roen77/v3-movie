const axios=require("axios");
exports.handler=async function(event){
    console.log(event)
    const payload=JSON.parse(event.body)
    const {title,type,year,page,id}=payload
    const OMDP_API_KEY = 'f7416374';
    const url=id?
    `https://www.omdbapi.com/?apikey=${OMDP_API_KEY}&i=${id}`
     :`https://www.omdbapi.com/?apikey=${OMDP_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    // const url=`https://www.omdbapi.com/?apikey=${OMDP_API_KEY}`

    try {
     const {data}=  await axios.get(url)
     if(data.Error){
         return {
            statusCode:400,
            body:data.Error
         }
     }
     return {
         statusCode:200,
         body:JSON.stringify(data)
     }
    } catch (error) {
        return {
            statusCode:error.response.status,
            body:error.message
        }
    }

}