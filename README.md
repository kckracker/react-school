# School Rest API
### But first... [^1]
___
## Summary

The React School app utilizes it's own API for storing data and returning responses to browser requests. For more information on the API project please see the README file located in the api folder.
The client side of the React School app is built using React JSX and utilizes React Hooks, Context, and React Router for directing routes. Below are a few points to supply a high overview of the application.
For more in depth details please review the code comments located within the application.

- React Router is utilized to wrap the application and direct requests based on the URL supplied. 
Within this functionality, I have generated a PrivateRoute component which wraps a Route tag with a Context Consumer tag to check if an authenticated user is found and redirect if not.

- Context is utilized to make the application's calls to the API for db fetching and manipulating.
I have incorporated a higher order component utilizing the withContext method to wrap each component requiring these methods in a Consumer tag.
Context pulls the fetching methods from the Data class which defines the api method for interacting with the API throughout the application.

- React useState hooks are utilized throughout to retain local state and push that info to the context methods for requests to the API.
In addition, I have utilized useEffect hooks for cleanup on local state storage and Context errors.
The errors are generated from an error handling method within Context that displays Validation Errors when invalid data is pushed to the API.

Thank you for taking the time to read me!



[^1]: This project makes use of NodeJS modules to function properly. Please run "npm start" in your console in both the client and api folders of the project.
