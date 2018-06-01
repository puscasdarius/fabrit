# fabrit

Technical requirements:
Create a web app using Angular 4 for the front-end and ASP .NET WebAPI for the back end. Store the
data in a relational database (preferably SQL Server)
Functional requirements:
1. Menu bar with 2 buttons:
a. Add new City
b. Statistics
2. ͚Add new City͛ menu button will take the user to a form to input the following data
a. Country – choose from a drop down with 10 countries
b. City – choose from a drop down filtered by country
c. Number of occupants – free text with validation and formatting
d. Area – free text with validation and formatting
i. Save button to send the form data through an API and save info in database
3. ͚Statistics͛ menu button will take the user to a page containing:
a. A table with the following columns:
i. City
ii. Country
iii. Number of occupants
iv. Area
v. Population density
vi. City Coordinates from Google API???
b. A table with the following columns:
i. Country
ii. Total population
iii. Average City population
iv. Population density
c. A chart with Countries population density (any free javascript based chart library. Eg:
ChartJS) 
