# Z Prefix CRUD Application Project

This application implements a simple inventory management system that meets all requirements laid out in the Z-Prefix App Requirements.

## Installation

1. Fork and clone the following repository in a directory of your choosing: `https://github.com/benlesko/z-prefix-crudapp`
2. Navigate to the new project directory.
3. Confirm that Docker is running on your machine.
4. Ensure you are in the top level directory for the project and run the following command: `docker compose up -d` or `docker-compose up -d`
5. The frontend application should now be running on port 3000, the server on port 8080, and the db on the default port 5432 

## Usage

1. Open a browser and navigate to `http://localhost:3000/` to access the application.
3. You may now choose to either login, create a new account, or continue as a guest. 
* The database is seeded with two default users, admin and blesko. Only blesko has items registered in their account. 
* The passwords for both accounts are password.
4. As a guest, you will be taken to a default list view of all items, and given the option to view each item individually if you so choose.
5. As a user, you will be taken to a list view for your items. From here you have a few options.
* The first option available is to create a new item. Clicking on the button for this option will render a form. You may choose to complete this and post a new item to the db, or go back to the previous list you were viewing.
* The second option available is to toggle between viewing only your items, or every item from all users. If you are viewing all users' items, you will not have the ability to delete items, but you can still view each item individually. If you are viewing your items, you will have both the ability to delete and view items individually.
* The final option is the edit toggle. You can enable edit mode in either the list or individual item view (assuming you are viewing only your items). Edits can be made by clicking on the relevant text/number fields on the item(s) you would like to edit. *In list view, you CAN edit multiple items in one edit session! :D* Once you are finished, you can choose to either save or cancel your changes.
6. Once you are finished, you can logout using the button in the header and be taken you back to the login screen.

## Troubleshooting

I am not 100% sure if database initialization is fully handled by docker. If issues arise, you can manually create a postgres container, login, and create a database titled 'db'. From there you will have to create and run the frontend and backend images manually.

## Features

In addition to the functionality detailed in the requirements, the application also implements the following:

* Dark mode/ Light mode theme toggle
* Internal scrolling in list view when items will not fit on the screen.
* Responsive styling (to an extent, and some aspects are not perfect) 
* The ability to edit multiple items at once, instead of just individually.
## Authors

- [@benlesko](https://www.github.com/benlesko)

