import { Buttons } from './Buttons';
import { useParams } from 'react-router';
import { useState } from 'react';

// Renders update form for existing course - PUT request api/courses/:id - along with Cancel button to return to Course Detail view
export function UpdateCourse(props){
    let {id} = useParams();
    const context = props.context;
    const [course, setCourse] = useState([]);
    const [user, setUser] = useState({});
    const [didLoad, setDidLoad] = useState(false);

    const loadCourse = async () => {
        await context.data.fetchCourse(id)
            .then(data => {
                setCourse(data);
                setUser(data.User);
                setDidLoad(true);
            })
    }

    if(didLoad !== true){
        loadCourse();
    }

    return(
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={(e) => context.data.updateCourse(e)}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle"></label>
                            <input id="courseTitle" name="courseTitle" type="text" value={course.title}/>

                            <p>By {user.firstName} {user.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={course.description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded}></textarea>
                        </div>
                    </div>
                    <Buttons buttonName="Update Course"></Buttons>
                </form>
            </div>
        </main>
    )
}