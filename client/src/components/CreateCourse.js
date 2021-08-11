import {Link} from 'react-router-dom';

// Renders form to add new course to a user's list - POST request api/courses - along with Cancel button for return to Course List view
export function CreateCourse(props){

    const context = props.context;

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
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
                    <button className="button" type="submit">Create Course</button><Link className="button button-secondary" to="/">Cancel</Link> 
                </form>
            </div>
        </main>
    );
}

/* <div class="validation--errors">
    <h3>Validation Errors</h3>
    <ul>
        <li>Please provide a value for "Title"</li>
        <li>Please provide a value for "Description"</li>
    </ul>
</div> */

