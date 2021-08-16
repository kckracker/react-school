import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../Context';
 
// Use a stateless component to wrap an instance of the Router component and redirects to SignIn if no authenticated user 
export function PrivateRoute({component: Component, ...rest}){
    return(
        <Consumer>
        { context =>
        (
            <Route
                render={ props =>
                    context.authenticatedUser
                    ?     ( <Component {...rest} /> )

                    :   (<Redirect to={{
                        pathname: '/signin',
                        state: { from: props.location }
                            }}
                        />
                        ) 
                }
            />
            )
        }
        </Consumer>
    )
}