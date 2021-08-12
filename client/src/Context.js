import React, {Component} from "react";
import { Data } from "./Data";
import Cookies from 'js-cookie';
import { createBrowserHistory } from "history";

const AppContext = React.createContext();

export const appHistory = createBrowserHistory();

export class Provider extends Component{
    constructor(){
        super();
        this.data = new Data();
    }

    state = {
        authenticatedUser: Cookies.get('authenticatedUser') || null,
        formData: {},
        errors: []
    }

    

    render(){
        
        const { authenticatedUser } = this.state;
        const {formData} = this.state;

        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signUp: this.signUp,
                signOut: this.signOut,
                handleInput: this.handleInput,
                createCourse: this.createCourse,
                createUser: this.createUser,
                updateCourse: this.updateCourse, 
                resetForm: this.resetFormState
            },
            formData
        };

        return(
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

    signIn = async (e) => { 
        e.preventDefault();
        let emailAddress = this.state.formData.emailAddress;
        let password = this.state.formData.password;
        const user = await this.data.fetchUser(emailAddress, password);
        if(user){
            this.setState({
                    authenticatedUser: {
                        ...user,
                        password: password
                    }
            });
            Cookies.set('authenticatedUser', user, {expires: 1});
            appHistory.goBack();
            
        } else if(user === null){
            appHistory.push('/unauthorized');
        } else {
            appHistory.push('/error');
        }
        this.resetFormState();
    }

    signUp = async(e) => {
        e.preventDefault();
        let input = this.state.formData;
        const user =  await this.createUser(input)
        if(user){
            await this.signIn(e);
        }
    }

    signOut = async() => {
        this.setState({
            authenticatedUser: null
        });
        Cookies.remove('authenticatedUser');
    }

    createUser = async(e) => {
        e.preventDefault();
        const newUser = await this.data.api('/users', 'POST', this.state.formData, false, null);
        if(newUser.status === 201){
            return newUser.json().then(user => user)
        } else {
            return null;
        }
        
    }

    createCourse = async (e) => {
        e.preventDefault();
        let credentials = {
            username: this.state.authenticatedUser.emailAddress,
            password: this.state.authenticatedUser.password
        }
        
        await this.data.api('/courses', 'POST', this.state.formData, true, credentials)
            .then(response => console.log(response.json()))
        

        appHistory.push('/');
       
        
    }

    updateCourse = async (e, id) => {
        e.preventDefault();
        let credentials = {
            username: this.state.authenticatedUser.username,
            password: this.state.authenticatedUser.password
        }
        const updatedCourse = await this.data.api(`/courses/${id}`, 'PUT', this.formData, true, credentials);
        if(updatedCourse.status === 201){
            appHistory.push('/');
            this.resetFormState();
        } else {
            console.log(updatedCourse);
        }
        
    }

    handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            formData: {...this.state.formData,
            [name]: value}
        });
    }

    resetFormState = async() => {
        this.setState({
            formData: {}
        });
    }
    
}

export const Consumer = AppContext.Consumer;

/**
 * Component accepting a component and wrapping it in an AppContext Consumer component.
 * @param {Component} - Accepts React Component
 * @returns {function} - Returns a higher-order component
 */
export default function withContext(Component){
    return function AppContextComponent(props){
        return (
        <AppContext.Consumer>
            {value => <Component {...props} context={value} />}
        </AppContext.Consumer>
        );
    }
}

