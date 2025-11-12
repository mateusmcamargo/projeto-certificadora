import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../useCases/userCRUD";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext(null)

const initValues = {
    id:null,
    name:null,
    email:null,
    cards:[],
    deposits:[],
}

export const ProfileProvider = ({children}) => {
    const [profile, setProfile] = useState(initValues);
    const {authData} = useAuth();

    //changeName from firebase profiles collection

    //changeEmail and verigy if already exists on firebase profiles collection

    //change, add or remove cards from firebase

    //change add or remove deposits from firebase
    useEffect(() => {
        if(!authData.user) return;
        getUser(authData.user.email).then((data) => {
            if(data){
                setProfile({
                    id:authData.user.uid,
                    name:data.nome,
                    email:data.email,
                    cards:data.cards || [],
                    deposits:data.deposits || [],
                })
            }
        })
    }, [authData.user])

    return (
        <ProfileContext.Provider value={{profile, setProfile}}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfileContext = () => useContext(ProfileContext);