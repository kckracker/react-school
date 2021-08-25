import { Link } from "react-router-dom"

export function NotFound(){
    
    return(
        <main>
            <div className="wrap">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for.</p>
                <Link to="/" className="button">Go Home</Link>
            </div>
        </main>
    )
    
}