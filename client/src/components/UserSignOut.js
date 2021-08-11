import { Redirect } from "react-router";
// Signs out user and redirects to the default route - list of courses
export function UserSignOut(props){
    const context = props.context;

    context.actions.signOut();
    return(
        <Redirect to="/" />
    )
}
