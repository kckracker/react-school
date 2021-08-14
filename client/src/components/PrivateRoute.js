import {Route, Redirect} from 'react-router-dom';


// Use a stateless component to wrap an instance of the Router component and redirects to SignIn if no authenticated user 
export function PrivateRoute(props, {children, ...rest }){
    let authUser = props.context.credentials;
    return(
        <Route
            {...rest}
            render={({location}) =>
                authUser
                ?    ( children )

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