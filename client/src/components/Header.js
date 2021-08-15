import {Link} from 'react-router-dom';


// Header tags for each page of application
export function Header(props){
    const context = props.context;

    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                { context.authenticatedUser
                    ? <ul className="header--signedout">
                        <li>Welcome {context.authenticatedUser.firstName}!</li>
                        <li><Link to="/signout">Sign Out</Link></li>
                    </ul>

                    : <ul className="header--signedout">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                    </ul>
                
                    
                }
                    
                </nav>
            </div>
        </header>
    )
}