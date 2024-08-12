import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUserLogin: () => {
  },
  setToken: () => {
  }
})
export const ContextProvider = ({children}) => {
  const [userLogin, setUserLogin] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  // const [token, _setToken] = useState(123);

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
      // localStorage.setItem('uidx', userLogin.id);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
      // localStorage.removeItem('uidx');
    }
  }
  return (
    <StateContext.Provider value={{
      userLogin,
      token,
      setUserLogin,
      setToken
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
