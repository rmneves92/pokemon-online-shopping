# Pokémon Online Shopping

## About the Project

This project lists all available Pokémon and allows you to see the details of each Pokémon. The ability to filter by name, ID or abilities makes it easy to find specific Pokémons, while the ability to view details and navigate through pages makes it easy to explore the entire list.

## Features

1. **List of all Pokémons**: The application has a comprehensive list of all Pokémons, which includes their name, ID, abilities, images, stats, and types.

2. **Filter by name, id and abilities**: You can use the filter feature to search for specific Pokémons based on their name, ID, or abilities. For example, if you want to search for all Pokémons that have the "Thunderbolt" ability, you can use the filter to search for Pokémons with that specific ability.

3. **Navigation**: Navigate to the next or previous page.

4. **Set the limit of Pokémons**: The application allows you to set a limit on the number of Pokémons you want to see per page. For example, you can set a limit of 20 Pokémons per page, and the application will display 20 Pokémons at a time. This feature can be useful if you want to quickly browse through the Pokémons without having to load too many at once.

5. **Click to see details**: If you click on a specific Pokémon in the list, you can see more details about it, including images, stats, abilities, and types. This feature is helpful if you want to learn more about a specific Pokémon or if you want to compare different Pokémons. You can click back to return to the list of Pokémons.

## Technologies

`React`, `Jest`, `React Testing Library`, and `CSS Modules`.

## Setup

1. Run the command `npm install` or `yarn` in the terminal to install all the necessary dependencies for the project. This will download and install all the required packages and libraries needed to run the application.
2. Once the installation is complete, run the command `npm start` or `yarn start` in the terminal to start the application.
3. The application should now open in your default browser at `http://localhost:3000/`.

## Tests

1. Run the command `npm run test` or `yarn test` in your terminal will run all unit tests set up for the project using `Jest` and `React Testing Library`.

[jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock) was used to mock fetch API in Jest tests. It provides a way to simulate the response from an API endpoint to test the code that makes requests to that endpoint.

## Approach

This application has only one page called `Home`. When the Home page is mounted, it initializes several pieces of state using the `useState` hook, and uses `useRef` in the text field to search for Pokémons.
The Home page fetches data from the PokeAPI using the fetch function to get lists of Pokémon and their abilities, as well as information about specific Pokémon. The fetched data is then used to set the state, which controls the rendering of components that display Pokémon data.
The project includes several helper functions that allow users to filter the displayed Pokémon based on their abilities or to search for specific Pokémon by name or id.
The project also uses the `useEffect` hook to watch for changes to state values and execute certain code blocks when those values change. This includes updating the displayed Pokémon when the selected abilities change, or resetting the displayed Pokémon when the search query is cleared.
Finally, the `Home` component defines a series of child components that render the various UI elements of the app, including a list of Pokémon, a search bar, and various filters and pagination controls.
