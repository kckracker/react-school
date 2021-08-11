import { Link } from 'react-router-dom';
import withContext from '../Context';
import { Buttons } from './Buttons';

const ButtonsWithContext = withContext(Buttons);
// Allows user to sign in with existing credentials and a Cancel button which directs to the Course list

export function UserSignIn(props){

    const context = props.context; 

    return(
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={context.actions.signIn}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" placeholder="email address" onChange={context.actions.handleInput} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="password" onChange={context.actions.handleInput} />
                    <ButtonsWithContext buttonName="Sign In"/>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
            </div>
        </main>
    )
}