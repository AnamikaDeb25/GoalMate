# Goal Mate

## Overview

Goal Mate is a React Native application designed to help users set, track, and achieve their personal goals. Users can sign up for an account, log in, add new goals, and monitor their progress over time. The app aims to provide a simple and intuitive interface for managing goals and staying motivated.

## Features

- **User Authentication**: Secure sign-up and log-in functionality using phone number and password.
- **Add Goals**: Users can create new goals by providing a title, description, and deadline.
- **Track Progress**: Users can update the status of their goals and mark them as completed.
- **Profile Management**: Users can update their personal information and view their goal statistics.
  
## Project Structure
/src
  /components - Reusable components
  /screens - Screen components (Login, SignUp, Home, GoalList, Profile)
  /navigation - Navigation setup
  /reduxtoolkit - Redux toolkit setup for state management
  /api - For API call
  /styles - For adding reusable custom styles
/App.js - Entry point of the app

## Installation

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/your_username/your_project_name.git](https://github.com/AnamikaDeb25/GoalMate.git)
    cd GoalMate
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Install iOS dependencies:**

    ```bash
    cd ios
    pod install
    cd ..
    ```

## Running the app

### Android

```bash
npm run android
# or
yarn android


