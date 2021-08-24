import { Buttons } from './Buttons';
import { useState, useEffect } from 'react';
import withContext from '../Context';

const ButtonsWithContext = withContext(Buttons);

// Renders update form for existing course - PUT request api/courses/:id - along with Cancel button to return to Course Detail view
export function UpdateCourse(props){
    const context = props.context;

    useEffect(() => context.actions.resetForm, [context.actions.resetForm]);
    useEffect(() => context.actions.resetErrors, [context.actions.resetErrors]);

    const [course, setCourse] = useState([]);
    const [user, setUser] = useState({});
    const [didLoad, setDidLoad] = useState(false);
    const { id } = props.computedMatch.params;

    
    const loadCourse = async () => {
        await context.data.fetchCourse(id)
            .then(each => {
                setCourse(each);
                context.actions.setFormData(each);
                setUser(each.User);
                setDidLoad(true);
            })
    }

    if(didLoad !== true){
        loadCourse();
    }

    async function handleSubmit(e){
        e.preventDefault();
        await context.actions.updateCourse(id);
    }

    return(
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
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
                            <label htmlFor="title"></label>
                            <input id="title" name="title" type="text" defaultValue={course.title} onChange={context.actions.handleInput}/>

                            <p>By {user.firstName} {user.lastName}</p>

                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" defaultValue={course.description} onChange={context.actions.handleInput}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} onChange={context.actions.handleInput} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded} onChange={context.actions.handleInput}></textarea>
                        </div>
                    </div>
                    <ButtonsWithContext buttonName="Update Course"></ButtonsWithContext>
                </form>
            </div>
        </main>
    )
}