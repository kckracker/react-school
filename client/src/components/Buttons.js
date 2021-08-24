import { useHistory } from "react-router-dom";

// Function component to handle cancel form React calls
export function Buttons(props){

    const context = props.context;
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        context.actions.resetForm();
        context.actions.resetErrors();
        history.push('/');
    }


    return(
        <div>
            <button className="button" type="submit">{props.buttonName}</button><button className="button button-secondary" onClick={handleClick}>Cancel</button>
        </div>
    )
}