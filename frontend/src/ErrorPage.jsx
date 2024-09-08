import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
    <div id="error-page" style={{
            width: '50%',
            margin: '20px auto',
            textAlign: 'center'
        }}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
    </div>
    )
};

export default ErrorPage;