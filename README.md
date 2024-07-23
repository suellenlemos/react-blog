# React Blog

## Description

This project is a blog application built with React, TypeScript and Vite. The blog features the following functionalities:

- User registration
- User login
- Viewing blog posts
- Editing and deleting blog posts
- Viewing, editing, and deleting comments on blog posts

A fake API was used for the backend, which can be found in the [FakeApiJs repository](https://github.com/DiegoSilva94/FakeApiJs).

For database, I've followed the fake API format, saving data in the localStorage.

Upon accessing the home page, a list of mock posts will be loaded within the application itself, as the feature to add a new post is not yet implemented.

## Main Stacks

- React v18.3.1 - was chosen because of its component-based architecture, which allows for reusable and modular UI components;
- TypeScript v5.2.2 - was chosen for its static type checking capabilities, which help catch errors early during development and improve code quality;
- Vite v5.3.4 - was selected as the build tool due to its fast development server and optimized build process;
- Tailwind CSS v3.4.6 - was selected for its utility-first approach to styling. It allows for rapid and flexible design without writing custom CSS for every component;

## Packages Added

- @radix-ui/react-dialog: For creating modal dialogs
- @radix-ui/react-dropdown-menu: To implement dropdown menus
- @radix-ui/react-icons: For using Radix UI icons
- @radix-ui/react-primitive: Utility components from Radix UI
- @radix-ui/react-tooltip: For tooltips
- clsx: Utility for constructing className strings conditionally
- react-hook-form: For handling form state
- react-hot-toast: To display toast notifications
- react-icons: For using icons in the application
- react-router-dom: To handle routing in the application
- tailwind-merge: To merge Tailwind CSS classes
- use-local-storage: Hook for managing localStorage

## Dev Dependencies

- autoprefixer: PostCSS plugin to parse CSS and add vendor prefixes
- eslint: Linter for TypeScript
- postcss: Tool for transforming CSS with JavaScript

## Installation

To get started with the project, follow these steps:

1. Clone the repository
2. Install the dependencies with `yarn install`
3. Start the development server with `yarn dev`

## Future Features

- Viewing a post
- Adding a new post
- Adding a new comment to a post

## Conclusion

This project serves as a basic implementation of a blog with user management and CRUD operations for posts and comments. The use of a fake API and localStorage helps in rapid development and testing. Future enhancements will focus on expanding the functionality and improving the user experience.
