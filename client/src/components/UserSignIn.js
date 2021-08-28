import { Link } from 'react-router-dom';
import withContext from '../Context';
import { Buttons } from './Buttons';
import { useEffect, useState } from 'react';


const ButtonsWithContext = withContext(Buttons);

// Allows user to sign in with existing credentials and a Cancel button which directs to the Course list



export function UserSignIn(props){
    const context = props.context;

    const [formData, setFormData] = useState();

    /**
     * Handles input received from user by pushing value of input into the formData state object.
     * 
     * @param {event} e | The keyboard input event triggering the function call.
     */

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [name]: value}
        )
    };

    /**
     * Handles submission of form by preventing default and awaiting context method signIn with state value formData
     * 
     * @param {event} e 
     */

    const handleSubmit = async (e) => {
        e.preventDefault();
        await context.actions.signIn(formData);
    }

    // Cleans up formData on page change
    useEffect(() => setFormData({}), [setFormData]);
    // Cleans up context errors on page change
    useEffect(() => context.actions.resetErrors, [context.actions.resetErrors]);
    return(
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                { context.errors &&
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {context.errors}
                        </ul>
                    </div> 
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" placeholder="email address" onChange={handleInput} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="password" onChange={handleInput} />
                    <ButtonsWithContext buttonName="Sign In"/>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
            </div>
        </main>
    )
}