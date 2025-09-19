import { createContext, useReducer } from "react";

export const TitleColorContext = createContext();

export const titleColorReducer = (state, action) => {
    //switch
}

export const TitleColorContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(titleColorReducer , { color: 'purple' });
    // o color ta sendo enviado como estado inicial
    console.log("Title color context: ", state)
    //useReducer envia o estado atual com spread por ter mais de uma propriedade
    // e a função dispatch para enviar ações
    //açoes tem que ser tratadas aqui dentro do useReducer
    return (
        <TitleColorContext.Provider value={{ ...state, dispatch}}> 
            {children}
        </TitleColorContext.Provider>
    )
}
