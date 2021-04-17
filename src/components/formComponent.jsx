import React, {useState} from "react"
import axios from "axios"
import { useForm } from "react-hook-form"

const Form =()=>{

    const [serverStatusResponse, setServerStatusResponse] = useState(null)
    const [serverUsernameResponse, setServerUsernameResponse] = useState(null)
    const {register, handleSubmit} = useForm()

    const onSubmitUserForm = async(data) =>{
        const body = {
            username: data.username
        }
        const sendProfile = await axios.post("http://localhost:3002/profile/create", body)
        console.log(sendProfile)
        console.log(sendProfile.status)
        console.log(sendProfile.data.userCreated.username)
        console.log(data.username)

        if(sendProfile.data.userCreated.username === data.username){
            setServerStatusResponse(sendProfile.status)
            setServerUsernameResponse(sendProfile.data.userCreated.username)
        }else{
            setServerStatusResponse(null)
        }
        
        //(sendProfile.data.userCreated.username === data.username) ? setServerStatusResponse(sendProfile.status) : serverStatusResponse(null);
        
    } 

    const onSubmitImageForm = async(data) =>{
        console.log(data)
        const body = {
            username: data.username
        }
        console.log(body)

        const formData = new FormData();
        formData.append('image', data.image[0])
        
        // const info = {
        //       formData,
        //       username:  serverUsernameResponse, 
        // }
        
        // const information = {
        //     headers: new Headers({
        //         'image': data.image,
        //     }),
        //     body:{
        //         username: data.username
        //     }
        // }
        
        const config  = {
            headers:{
                'content-type': 'multipart/form-data'
            },
            
        }

        
        console.log(data)
        //console.log(info)
        const URL = `http://localhost:3002/profile/photos/upload-image/${serverUsernameResponse}`
        console.log(URL)
        const sendProfile = await axios.post(URL, formData, config)
        console.log(sendProfile)
    } 



    return (
        <div>
            {
                (serverStatusResponse !== 200 || null)
                ? 
                <form onSubmit={handleSubmit(onSubmitUserForm)}>
                    <input 
                    type="text"
                    placeholder="new username"
                    {...register("username")}/>
                    <button>SEND</button>
                </form>
                :<form onSubmit={handleSubmit(onSubmitImageForm)} encType='multipart/form-data'>
                    <input 
                    type="file"
                    {...register("image")}/>
                    <button>SEND</button>  
                </form>
            }
        </div>
    )
}

export default Form;