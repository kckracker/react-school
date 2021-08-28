import config from "./config"

export class Data {

    /**
     * 
     * @param {string} path URL string for the HTTP method
     * @param {string} method String informing the API of the method of request
     * @param {object} body Request body containing form data for API POST requests
     * @param {boolean} requiresAuth Confirms if route and method combination requires credentials
     * @param {object} credentials Credential object containing username and password
     * @returns 
     */
     api(path, method="GET", body = null, requiresAuth = false, credentials=null){
        
        const url = config.apiBaseURL + path;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }

        if(body !== null){
            options.body = JSON.stringify(body)
        }

        if(requiresAuth){
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization']= `Basic ${encodedCredentials}`;
        }

        return fetch(url, options)
    }

    /**
     * Makes GET request to courses to fetch all available courses.
     * @returns JSON parsed courses data
     */
    async fetchCourses(){
        const apiCourses = await this.api('/courses', 'GET', null, false, null)
        if(apiCourses.status === 200){
            return apiCourses.json().then(course => course)
        } else {
            throw new Error()
        }
    }

    /**
     * Makes GET request to users to fetch user detail based on the credentials supplied
     * 
     * @param {string} username A user's login credential
     * @param {string} password A user's password credential
     * @returns 
     */
    async fetchUser(username, password){ 
        const user = await this.api('/users', 'GET', null, true, {username, password})
        if(user.status === 200){
            return user.json().then(data => data)
        } else if(user.status === 401 || user.status === 400){
            return user.json().then(data => data)
        } else{
            throw new Error();
        }   
    }

    /**
     * Makes a GET request to courses for course detail about a specific course
     * 
     * @param {number} id Accepts the number correlating to a specific course id
     * @returns 
     */
    async fetchCourse(id){
        const course = await this.api(`/courses/${id}`, 'GET', null, false, null);
        if(course.status === 200){
            return course.json().then(data => data)
        }
        else if(course.status === 401){
            return null
        } else {
            throw new Error();
        }
        
        
    }

}

