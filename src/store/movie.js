import axios from 'axios';
import _uniqBy from 'lodash/uniqBy'

const _defaultMsg=`Searh for the movie`
export default {
    // module
    namespaced:true,
    // data
    state:()=>({
        movies:[],
        message:_defaultMsg,
        loading:false,
        theMovie:{}
    }),
    // computed
    getters:{},
    // mothods
    // 변이임(데이터의 수정은 mutations에서 해야한다)
    mutations:{
        // assignMovies(state,Search){
        //     state.movies=Search
        // },
        updateState(state,payload){
            // ['movies','message','loading']
            Object.keys(payload).forEach(key=>{
                state[key]=payload[key]
            })
        },
        resetMovies(state){
            state.movies=[],
            state.message=_defaultMsg,
            state.loading=false
        },


    },
    // 비동기 함수
    actions:{
       async searchMovies({commit,state},payload) {
           if(state.loading) return
           commit('updateState',{
               message:'',
               loading:true
           })
            try {
                        //    promise로 return해줄때 무조건 await 히야한다 안그럼 promise 객체가나옴
            const res =await _fetchMovie({
                ...payload,
                page:1
            })
            const {Search,totalResults}=res.data;
            commit('updateState',{
                movies:_uniqBy(Search,'imdbID')
            })

            const total=parseInt(totalResults,10);
            const pageLength=Math.ceil(total/10);

            // 추가요청
            if(pageLength>1){
                for(let page =2; page<=pageLength; page++){
                    if(page>(payload.number/10)) return
                    const res =await _fetchMovie({
                        ...payload,
                        page
                    })
                    const {Search}=res.data;
                    commit("updateState",{
                        movies:[...state.movies,..._uniqBy(Search,'imdbID')]
                    })
                }
            }
            // 추가요청
            } catch (message) {
                commit('updateState',{
                    movies:[],
                    message
                })
            }
            finally{
                commit('updateState',{
                    loading:false
                })
            }
        },
        async searchMovieWithId({commit,state},payload){
            if(state.loading) return
           commit('updateState',{
               thisMovie:{},
               loading:true
           })
            try {
                const res=await _fetchMovie(payload)
                commit('updateState',{
                    theMovie:res.data
                })
            } catch (error) {
                commit('updateState',{
                    theMovie:{}
                })
            }
            finally{
                console.log('findall')
                commit('updateState',{
                    loading:false
                })
            }
        }
    }

}

function _fetchMovie(payload){
    const {title,type,year,page,id}=payload
    const OMDP_API_KEY = 'f7416374';
    const url=id?
    `https://www.omdbapi.com/?apikey=${OMDP_API_KEY}&i=${id}`
     :`https://www.omdbapi.com/?apikey=${OMDP_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    // const url=`https://www.omdbapi.com/?apikey=${OMDP_API_KEY}`

    return new Promise((resolve,reject)=>{
        axios.get(url)
        .then(res=>{
            if(res.data.Error){
               return reject(res.data.Error)
            }
            resolve(res)
        })
        .catch(err=>reject(err.message))
    })
}