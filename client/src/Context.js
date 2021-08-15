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
        credentials: null ,
        errors: []
    }

    

    render(){
        
        const { authenticatedUser } = this.state;
        const { credentials } = this.state;
        const { errors } = this.state;

        const value = {
            authenticatedUser,
            credentials,
            errors,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signUp: this.signUp,
                signOut: this.signOut,
                handleInput: this.handleInput,
                createCourse: this.createCourse,
                createUser: this.createUser,
                updateCourse: this.updateCourse, 
                resetForm: this.resetFormState,
                deleteCourse: this.deleteCourse
            },
            
        };

        return(
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

    signIn = async () => { 
        let emailAddress = this.state.formData.emailAddress;
        let password = this.state.formData.password;
        const user = await this.data.fetchUser(emailAddress, password);
        if(user){
            this.setState({
                    authenticatedUser: {
                        ...user,
                        password: password
                    },
                    credentials: {
                        username: emailAddress,
                        password: password
                    }
            });
            Cookies.set('authenticatedUser', user, {expires: 1});
            
        } else {
            this.handleError(user);
        }
        this.resetFormState();
    }

    signUp = async (e) => {
        e.preventDefault();
        let input = this.state.formData;
        const newUser = await this.data.api('/users', 'POST', input, false, null);
        if(newUser){
            await this.signIn(e);
        } else {
            this.handleError(newUser);
        }
    }

    signOut = async() => {
        this.setState({
            authenticatedUser: null,
            credentials: null
        });
        Cookies.remove('authenticatedUser');
    }

    createCourse = async (e) => {
        e.preventDefault();
                
        const newCourse = await this.data.api('/courses', 'POST', {...this.state.formData, userId: this.state.authenticatedUser.id}, true, this.state.credentials);
        if(newCourse.status === 201){
            appHistory.push('/');
        } else {
            this.handleError(newCourse);
        }
       this.resetFormState();
        
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
        } else {
            this.handleError(updatedCourse)
        }
        this.resetFormState();
    }

    handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            formData: {...this.state.formData,
            [name]: value}
        });
    }

    handleError = async (response) => {
        response.json().then(data => this.errors.push(data)).then(console.log(this.errors));
    }

    resetFormState = () => {
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

