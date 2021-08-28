import { useEffect,useState } from "react";
import { Buttons } from "./Buttons";
import { Link} from "react-router-dom";
import withContext from "../Context";


const ButtonsWithContext = withContext(Buttons);
// Renders form for user to signup for a new account - POST request to api/users - also Cancel button that returns to Course List
export function UserSignUp(props){

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
     * Handles submission of form by preventing default and awaiting context method createCourse with state value formData
     * 
     * @param {event} e The form submission event
     */

    const handleSubmit = async (e) => {
        e.preventDefault();
        await context.actions.signUp(formData);
    }

    // Cleans up formData on page change
    useEffect(() => setFormData({}), [setFormData]);
    // Cleans up context errors on page change
    useEffect(() => context.actions.resetErrors, [context.actions.resetErrors]);

    return(
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                { context.errors &&
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {context.errors}
                        </ul>
                    </div> 
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" defaultValue="" onChange={handleInput} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" defaultValue="" onChange={handleInput} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue="" onChange={handleInput} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" defaultValue="" onChange={handleInput} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" defaultValue="" />
                    <ButtonsWithContext buttonName="Sign Up"/>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    )
}