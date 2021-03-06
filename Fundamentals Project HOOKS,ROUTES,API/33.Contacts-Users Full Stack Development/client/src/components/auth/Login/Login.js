import React, { useState,useContext,useEffect } from "react";
import AuthContext from "../../../context/auth/authContext";
import AlertsContext from "../../../context/alert/alertContext";
import style from "./Login.module.css";

const Login = props => {
  const alertContext = useContext(AlertsContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login,error,clearError,isAuthenticated } = authContext;

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/');
    }

    if(error==='Invalid Credentials'){
      setAlert(error,'danger');
      clearError();
    }
  },[error, isAuthenticated,props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if(email===''||password===''){
      setAlert('Please fill in all fields','danger')
    }else{
      login({
        email,
        password
      })
    }
  };

  return (
    <div className={style.container}>
      <h1>
        Account:
        <span>Login</span>
      </h1>
      <form className={style.myForm} onSubmit={onSubmit}>
        <div className={style.divForm}>
          <input className={style} type="email" name="email" value={email} onChange={onChange} required placeholder="email" />
        </div>
        <div className={style.divForm}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            placeholder="Password"
          />
        </div>
        <input className={style.submit} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
