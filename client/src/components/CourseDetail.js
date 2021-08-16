import {useState} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';


// Retrieves a user's course details - GET request for api/courses/:id - also a Delete button to send DELETE request for api/courses/:id and Update button to direct to the UpdateCourse component

export function CourseDetail(props){
    const context = props.context;

    const history = useHistory();
    const [course, setCourse] = useState([]);
    const [user, setUser] = useState("");
    const [didLoad, setDidLoad] = useState(false);
    const {id} = useParams();


    const loadCourse = async () => {
        await context.data.fetchCourse(id)
            .then(each => {
                setCourse(each);
                setUser(`${each.User.firstName} ${each.User.lastName}`);
                setDidLoad(true);
            })
    }

    if(didLoad !== true){
        loadCourse();
    }

    const deleteCourse = async (e) => {
        e.preventDefault();
        await context.data.api(`/courses/${id}`,"DELETE", null, true, context.credentials);
        history.push('/');
    }
    

    return(
        <main>
            <div className="actions--bar">
                <div className="wrap">
                { context.authenticatedUser && context.authenticatedUser.id === course.userId ?
                    <>
                    <Link className="button" to={{
                        pathname: `/courses/${id}/update`
                    }}>Update Course</Link>
                    <button type="button" className="button" onClick={deleteCourse}>Delete Course</button>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                    </>
                    :
                    <> 
                    <Link className="button button-secondary" to="/">Return to List</Link>
                    </>
                    }
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {user}</p>

                            <p>{course.description}</p>
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {course.materialsNeeded}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )

}