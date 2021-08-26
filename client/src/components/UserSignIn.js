import { Link } from 'react-router-dom';
import withContext from '../Context';
import { Buttons } from './Buttons';
import { useEffect } from 'react';


const ButtonsWithContext = withContext(Buttons);

// Allows user to sign in with existing credentials and a Cancel button which directs to the Course list



export function UserSignIn(props){
    const context = props.context;
    const handleSubmit = async (e) => {
        e.preventDefault();
        await context.actions.signIn()
            .catch(error => context.handleError(error))
    }


    useEffect(() => context.actions.resetForm, [context.actions.resetForm]);
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
                    <input id="emailAddress" name="emailAddress" type="email" placeholder="email address" onChange={context.actions.handleInput} required/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="password" onChange={context.actions.handleInput} required/>
                    <ButtonsWithContext buttonName="Sign In"/>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
            </div>
        </main>
    )
}