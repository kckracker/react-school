import React, {Component} from "react";
import { Data } from "./Data";
import Cookies from 'js-cookie';
import { createBrowserHistory } from "history";

const AppContext = React.createContext();

export const appHistory = createBrowserHistory();

const cookies = Cookies.withConverter({
    read: function(string){
        return JSON.parse(string)
    }
})

export class Provider extends Component{
    constructor(){
        super();
        this.data = new Data();
    }

    state = {
        authenticatedUser: cookies.get('authenticatedUser', {expires: 1}) || null,
        formData: {},
        credentials: null ,
        errors: null
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
            cookies.set('authenticatedUser', JSON.stringify(user) , {expires: 1});
            
        } else {
            this.handleError(user);
        }
        this.resetFormState();
    }

    signUp = async (e) => {
        e.preventDefault();
        let input = this.state.formData;
        const newUser = await this.data.api('/users', 'POST', input, false, null);
        if(newUser.status === 201){
            await this.signIn();
            appHistory.push('/')
        } else {
            this.handleError(newUser)
        }
    }

    signOut = async() => {
        this.setState({
            authenticatedUser: null,
            credentials: null
        });
        Cookies.remove('authenticatedUser');
    }


     /**
     * Places POST request to api to create a new course with the formData state recorded upon completion of the form. Hands off to handleError method to address error messaging.
     * 
     * @param {event} e | The form submission event.
     */

    createCourse = async (e) => {
        e.preventDefault();
        this.setState({errors: null});
        const newCourse = await this.data.api('/courses', 'POST', {...this.state.formData, userId: this.state.authenticatedUser.id}, true, this.state.credentials);
        if(newCourse.status === 201){
            appHistory.push('/');
        } else {
            this.handleError(newCourse);
        }
       this.resetFormState();
        
    }


    /**
     * Places POST request to api to update a specified course with the formData state recorded upon completion of the form. Hands off to handleError method to address error messaging.
     * 
     * @param {event} e | The form submission event.
     * @param {number} id | The course id defining the specific course needing update.
     */

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


    /**
     * Handles input received from user by pushing value of input into the formData state object.
     * 
     * @param {event} e | The keyboard input event triggering the function call.
     */

    handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            formData: {...this.state.formData,
            [name]: value}
        });
    }


    /**
     * Handles error messaging for form submissions throughout the application by updating the errors state of the Context application to an array of list items containing error messages.
     * 
     * @param {Object} response | Response object received from api call 
     * 
     */

    handleError = async (response) => {
        let errorArray = [];
        response.json().then(data => { 
            for(let each of data){
                errorArray.push(each.message)
            }
            let listItems = errorArray.map(message => <li key={message.index}>{message}</li>);
            
            this.setState({
                errors: listItems
            })
        }
        )
    }

    resetFormState = () => {
        this.setState({
            formData: {},
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

