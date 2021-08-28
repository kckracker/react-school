import { useEffect } from "react";
import { Redirect } from "react-router";
// Signs out user and redirects to the default route - list of courses
export function UserSignOut(props){
    const context = props.context;

    // Calls context method signOut on page direction
    useEffect(() => context.actions.signOut);
    return(
        <Redirect to="/" />
    )
}
