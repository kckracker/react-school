import { Buttons } from './Buttons';
import withContext from '../Context';
import { useEffect, useState } from 'react';


const ButtonsWithContext = withContext(Buttons);

// Renders form to add new course to a user's list - POST request api/courses - along with Cancel button for return to Course List view
export function CreateCourse(props){
    
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
        await context.actions.createCourse(formData);
    }

    // Cleans up formData on page change
    useEffect(() => setFormData({}), [setFormData]);
    // Cleans up context errors on page change
    useEffect(() => context.actions.resetErrors, [context.actions.resetErrors]);
    
    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                { context.errors &&
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {context.errors}
                        </ul>
                    </div> 
                }

                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" defaultValue="" onChange={handleInput} />
                        
                        
                            <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>
                    
                        
                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" onChange={handleInput}></textarea>
                       </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" onChange={handleInput} />    
                        
                        
                    
                        
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleInput} ></textarea>
                        </div>
                    </div>
                    <ButtonsWithContext buttonName="Create Course" />
                </form>
            </div>
        </main>
    );
}



