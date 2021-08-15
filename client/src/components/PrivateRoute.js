import {Route, Redirect, useLocation} from 'react-router-dom';
 
// Use a stateless component to wrap an instance of the Router component and redirects to SignIn if no authenticated user 
export function PrivateRoute(props){
    let authUser = props.context.credentials;
    const location = useLocation();
    return(
        <Route
            children={() =>
                authUser
                ?     ( props.component )

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