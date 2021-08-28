import { useHistory } from "react-router-dom";

// Function component to handle cancel form React calls
export function Buttons(props){
    const history = useHistory();

    /**
     * Prevents default, resets form data, resets errors, and returns user to previous page.
     * @param {event} e Button click event.
     */
    const handleClick = (e) => {
        e.preventDefault();
        history.goBack();
    }


    return(
        <div>
            <button className="button" type="submit">{props.buttonName}</button><button className="button button-secondary" onClick={handleClick}>Cancel</button>
        </div>
    )
}