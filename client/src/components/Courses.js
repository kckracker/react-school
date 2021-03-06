import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Renders a list of courses - GET request to api/courses - and links them to their corresponding CourseDetail component route. Also renders Create Course button.
export function Courses(props){
    const [courses, setCourses] = useState([]);

    // Effect call fetches course list on page change by calling context method fetchCourses.
    useEffect(() => {
        async function getCourses() {
            await props.context.data.fetchCourses()
            .then(each => {
                setCourses(each.map(course => {
                    return <Link key={course.id} className="course--module course--link" to={`/courses/${course.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                        </Link>
                }));
            })    
        }
        getCourses();
    }, [props.context.data, setCourses]
    );

    return(
        <main>
            <div className="wrap main--grid">
                {courses}
                <Link className="course--module course--add--module" to="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        </main>
    )
}