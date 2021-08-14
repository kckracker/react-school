import {Route, Redirect} from 'react-router-dom';


// Use a stateless component to wrap an instance of the Router component and redirects to SignIn if no authenticated user 
export function PrivateRoute(props, {component, path}){
    const authUser = props.context.credentials;
    return(
        <Route
            path={path}
            render={({location}) =>
                authUser ?
                    (component)
                :   (<Redirect to={{
                    pathname: '/signin',
                    state: { from: location }
                        }}
                    />
                    ) 
            }
        />
    )
}