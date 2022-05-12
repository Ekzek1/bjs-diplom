"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, resp => {
        if(resp.success){
            location.reload();
        }else{
            setLoginErrorMessage(message)
        }
    })
};

userForm.registerFormCallback = (data) =>{
    ApiConnector.register(data, resp =>{
        if(resp.success){
            location.reload();
        }else{
            setRegisterErrorMessage(message);
        }
    })
}