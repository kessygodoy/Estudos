import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser  = async (data) => {
        checkIfIsCancelled();
        
        setLoading(true);

        try {
            const {user} = await createUserWithEmailAndPassword( //cria o usuario
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {displayName: data.displayName}) //atualiza o perfil do usuario

            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)
        }

        setLoading(false);
    }

    // o useEffect abaixo é para evitar memory leak
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading
    }
}