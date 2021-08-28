import React, {Component} from "react";
import { Data } from "./Data";
import Cookies from 'js-cookie';
import { createBrowserHistory } from "history";

const AppContext = React.createContext();


// Creates new BrowserHistory instance and requires refresh upon entry pushing to stack. Syntax help found from user BARNOWL at https://stackoverflow.com/questions/56747487/react-router-doesnt-re-render-after-history-push/56755280
export const appHistory = createBrowserHistory({forceRefresh: true});

export class Provider extends Component{
    constructor(props){
        super(props);
        this.data = new Data();
    }

    state = {
        authenticatedUser: Cookies.get('authenticatedUser') ? JSON.parse(Cookies.get('authenticatedUser')) : null ,
        errors: null
    }

    

    render(){
        
        const { authenticatedUser } = this.state;
        const { errors } = this.state;

        const value = {
            authenticatedUser,
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
                resetErrors: this.resetErrors,
                deleteCourse: this.deleteCourse,
                handleError: this.handleError
            },
            
        };

        return(
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

    /**
     * Calls fetchUser and stores user details if found or pushes error messaging to handleError method
     * 
     * @param {object} data User credential data supplied from local state variables upon form input and submission
     */
    signIn = async (data) => { 
        const user = await this.data.fetchUser(data.emailAddress, data.password);
        if(user.id){
            this.setState({
                authenticatedUser: {
                    ...user,
                    password: data.password
                }
                });
                Cookies.set('authenticatedUser', JSON.stringify(this.state.authenticatedUser) , {expires: 1});
                appHistory.goBack();
        } else {
            this.handleError(user);
        } 
  
        
    }

    /**
     * Awaits POST request to user with data supplied from object supplied from local state data. If successful, pushes to signIn method; if failed, pushes to handleError method.
     * 
     */
    signUp = async (formData) => {
        const newUser = await this.data.api('/users', 'POST', formData, false, null);
        if(newUser.status === 201){
            await this.signIn(formData);
        } else {
            newUser.json().then(data => this.handleError(data))   
        }
    }

    signOut = async () => {
        Cookies.remove('authenticatedUser');
        this.setState({
            authenticatedUser: null
        })
    }


     /**
     * Places POST request to api to create a new course with the formData state recorded upon completion of the form. Hands off to handleError method to address error messaging.
     * 
     * @param {event} e | The form submission event.
     */

    createCourse = async (formData) => {
        this.setState({errors: null});
        const credentials = {
            username: this.state.authenticatedUser.emailAddress,
            password: this.state.authenticatedUser.password
        }
        const newCourse = await this.data.api('/courses', 'POST', {...formData, userId: this.state.authenticatedUser.id}, true, credentials);
        if(newCourse.status === 201){
            appHistory.push('/');
        } else {
            newCourse.json().then( data => this.handleError(data));
        }
        
    }


    /**
     * Places PUT request to api to update a specified course with the formData state recorded upon completion of the form. Hands off to handleError method to address error messaging.
     * 
     * @param {number} id | The course id defining the specific course needing update.
     */

    updateCourse = async (id, formData) => {
        
        const credentials = {
            username: this.state.authenticatedUser.emailAddress,
            password: this.state.authenticatedUser.password
        }
        const updatedCourse = await this.data.api(`/courses/${id}`, 'PUT', {...formData, userId: this.state.authenticatedUser.id}, true, credentials);
        if(updatedCourse.status === 201 || updatedCourse.status === 304 || updatedCourse.status === 204){
            appHistory.push('/'); 
        } else {
            updatedCourse.json()
                .then(data => this.handleError(data));
        }
        
    }


    /**
     * Handles error messaging for form submissions throughout the application by updating the errors state of the Context application to an array of list items containing error messages.
     * 
     * @param {Object} response | Response object received from api call 
     * 
     */

    handleError = async (response) => {
        let errorArray = [];
        if(response.msg){
            this.setState({errors: <li>{response.msg}</li>})
        } else{
            for(let each of response){
                errorArray.push(each)
            }
            let listItems = errorArray.map(message => <li key={message.path}>{message.message}</li>);
            
            this.setState({
                errors: listItems
            })
        }
    }

    /**
     * Sets the context state variable errors to null
     */
    resetErrors = async () => {
        this.setState({
            errors: null
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

