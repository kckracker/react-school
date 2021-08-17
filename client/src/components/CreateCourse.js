import { useState } from 'react';
import {Buttons} from './Buttons';
import withContext from '../Context';

const ButtonsWithContext = withContext(Buttons);
// Renders form to add new course to a user's list - POST request api/courses - along with Cancel button for return to Course List view
export function CreateCourse(props){

    const context = props.context;
    const [didLoad, setDidLoad] = useState(false);

    if(didLoad === false){
        console.log(context.authenticatedUser);
        context.actions.resetForm();
        setDidLoad(true);
    }
    

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

                <form onSubmit={context.actions.createCourse}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" defaultValue="" onChange={context.actions.handleInput} />
                        </div>
                        
                    
                        <div>
                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" onChange={context.actions.handleInput}></textarea>
                        </div>
                        
                    
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" onChange={context.actions.handleInput} />    
                        </div>
                        
                    
                        <div>
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={context.actions.handleInput} ></textarea>
                        </div>
                    </div>
                    <ButtonsWithContext buttonName="Create Course" />
                </form>
            </div>
        </main>
    );
}



