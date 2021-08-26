import config from "./config"

export class Data {

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

    async fetchCourses(){
        const apiCourses = await this.api('/courses', 'GET', null, false, null)
        if(apiCourses.status === 200){
            return apiCourses.json().then(course => course)
        } else {
            throw new Error()
        }
    }

    async fetchUser(username, password){ 
        const user = await this.api('/users', 'GET', null, true, {username, password})
        if(user.status === 200){
            return user.json().then(data => data)
        } else if(user.status === 401){
            return user.json().then(data => data)
        } else{
            throw new Error();
        }   
    }

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

