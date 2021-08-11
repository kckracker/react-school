import { Buttons } from "./Buttons";
import { Link} from "react-router-dom";
import withContext from "../Context";


const ButtonsWithContext = withContext(Buttons);
// Renders form for user to signup for a new account - POST request to api/users - also Cancel button that returns to Course List
export function UserSignUp(props){

    const context = props.context;

    return(
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form onSubmit={context.actions.signUp}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" defaultValue="" onChange={context.actions.handleInput} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" defaultValue="" onChange={context.actions.handleInput} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue="" onChange={context.actions.handleInput} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue="" onChange={context.actions.handleInput} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" defaultValue="" />
                    <ButtonsWithContext buttonName="Sign Up"/>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    )
}