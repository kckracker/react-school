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
        formData: {},
        errors: null
    }

    

    render(){
        
        const { authenticatedUser } = this.state;
        const { errors } = this.state;
        const {formData} = this.state;

        const value = {
            authenticatedUser,
            formData,
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
                resetErrors: this.resetErrors,
                deleteCourse: this.deleteCourse,
                setFormData: this.setFormData,
                handleError: this.handleError
            },
            
        };

        return(
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        )
    }

    signIn = async () => { 
        const emailAddress = this.state.formData.emailAddress;
        const password = this.state.formData.password;
        const user = await this.data.fetchUser(emailAddress, password);
        if(user.id){
            this.setState({
                authenticatedUser: {
                    ...user,
                    password: password
                }
                });
                Cookies.set('authenticatedUser', JSON.stringify(this.state.authenticatedUser) , {expires: 1});
                appHistory.goBack();
                this.resetFormState();
        } else {
            this.handleError(user);
            this.resetFormState();
        } 
  
        
    }

    signUp = async (e) => {
        e.preventDefault();
        const input = this.state.formData;
        const newUser = await this.data.api('/users', 'POST', input, false, null);
        if(newUser.status === 201){
            await this.signIn();
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

    createCourse = async (e) => {
        e.preventDefault();
        this.setState({errors: null});
        const credentials = {
            username: this.state.authenticatedUser.emailAddress,
            password: this.state.authenticatedUser.password
        }
        const newCourse = await this.data.api('/courses', 'POST', {...this.state.formData, userId: this.state.authenticatedUser.id}, true, credentials);
        if(newCourse.status === 201){
            appHistory.push('/');
        } else {
            this.handleError(newCourse);
        }
       this.resetFormState();
        
    }


    /**
     * Places PUT request to api to update a specified course with the formData state recorded upon completion of the form. Hands off to handleError method to address error messaging.
     * 
     * @param {number} id | The course id defining the specific course needing update.
     */

    updateCourse = async (id) => {
        
        const credentials = {
            username: this.state.authenticatedUser.emailAddress,
            password: this.state.authenticatedUser.password
        }
        const updatedCourse = await this.data.api(`/courses/${id}`, 'PUT', {...this.state.formData, userId: this.state.authenticatedUser.id}, true, credentials);
        if(updatedCourse.status === 201 || updatedCourse.status === 304 || updatedCourse.status === 204){
            appHistory.push('/'); 
        } else {
            updatedCourse.json().then(data => this.handleError(data))  
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


    setFormData  = (data) => {
        this.setState({
            formData: {...data}
        })
    }

    /**
     * Handles error messaging for form submissions throughout the application by updating the errors state of the Context application to an array of list items containing error messages.
     * 
     * @param {Object} response | Response object received from api call 
     * 
     */

    handleError = async (response) => {
        let errorArray = [];
        if(Object.keys(response).length < 2){
            response.msg 
            ? this.setState({errors: <li key={response.path}>{response.msg}</li>})
            : this.setState({errors: <li key={response.path}>{response.message}</li>})
                
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

        
    

    resetFormState = async () => {
        this.setState({
            formData: {}
        });
    }

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

