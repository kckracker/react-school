import { Link} from "react-router-dom";

export function UnhandledError(){
    return(
        <main>
            <div className="wrap">
                <h2>Error</h2>
                <p>Sorry! We just encountered an unexpected error.</p>
                <Link to="/" className="button">Go Home</Link>
            </div>
        </main>
    )
}