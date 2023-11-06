import { useState } from "react"
import * as api from "../api/fetchUser"
import AuthStore from "../stores/AuthStore";

export const useLogin =  () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { signupData } = AuthStore()
    
    const login = async (user) => {
        
        try {
            const { response, data } = await api.loginUser(user)

            if (response.ok) {
                const user = { 
                    email: data.user.email, 
                    image: data.user.image,
                    userId: data.user._id,    
                    token: data.token 
                }
                signupData(user)
                setError("")
                setIsLoading(false)
                
                // save to localstorage
                localStorage.setItem('user', JSON.stringify(user))
            }
            
            if (!response.ok) {
                setError(data.message)
                setIsLoading(false)
            }

        } catch(error) {
            console.log(error)
        }   
    }
    
    return { login, isLoading, error }
}
