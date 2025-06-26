_Weather App - Rough Dev Notes - for reference_

## HTML
- Body
- Header
    - Heading
- Main
    - Cloud and Sun Icon Divs
    - LayoutWrapper Div
        - Main Frame Section
            - InputSearch Div
                - Clear Button
                - Input placeholder
                - Search Button
            - Weather Card Div
                - Weather Data through DOM
    - Recent-Container
        - Cities Buttons
    - Input Note P
 

## JS
- Retrieved required HTML components through DOM/ query selectors
- SearchWeather function (_line 10_)
    - Takes (city) as parameter 
    - Checks if input is empty and gives appropriate message using _.innerHTML_
    - Shows loader message while data is being fetched by API
    - Fetch data from _Open Weather Map API_ (_line 19_)
        - Converts data to _.json obj_
        - If city is not found error is thrown
        - Required data is fetched from the API
        - Data is shown in HTML Weather Card using _.innerHTML_
        - _.catch_ is used for error handling

- updateRecentCities function (_line 53_)
    - Takes (citySearch) as parameter
    - Retrieves cities [] from localStorage, otherwise creates an empty array
    - _.some()_ method is used to check if a city is already kept as a button
    - If not, the most recent city is added as the first item in array using _unshift()_
    - If there are more than 5 cities, the last city is deleted using _pop()_
        - Ensures that only the latest 5 cities are shown as buttons

- displayRecentCities function (_line 65_)
    - Retrieves recentCities array from localStorage and converts it to _.json obj_ using _JSON.parse()_
    - Empties the HTML recent-container first, before adding new values
    - Uses _for..of loop_ to create button element using DOM and adding _.innerText_ and CSS using  _.classList_
    - Uses event listener on the buttons to search the weather if they are clicked
 
- searchButton event listener (_line 83_)
    - Retrieves city value from input placeholder
    - Calls the searchWeather(city), updateRecentCities(city), displayRecentCities() when button is clicked

- clearBtn event listener (_line 93_)
    - Removes the cities array from localStorage
    - Calls the displayRecentCities() function and displays empty []

