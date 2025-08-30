<img width="1496" height="902" alt="image" src="https://github.com/user-attachments/assets/40fcaaa0-4e9f-42c3-ab2d-852e006eeacc" />

# 808s-podcast

A React TypeScript project created with Create React App and TypeScript Project Manager.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the TypeScript template.

### Available Scripts

In the project directory, you can run:

#### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run build`
Builds the app for production to the `build` folder.

#### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Project Structure

- `src/` - React TypeScript source files
- `public/` - Static assets
- `build/` - Production build output (after running `npm run build`)

## Additional Packages Installed

The following additional packages were installed:
- mui
- react-icons
- react-router-dom
- styled-components

## RSS Feed Integration

The application integrates with the 808's & Cold Takes RSS feed from Buzzsprout to display episodes dynamically. 

### Features:
- **Real-time Episode Loading**: Episodes are fetched from the RSS feed at runtime
- **Search Functionality**: Users can search through episodes by title and description
- **Pagination**: Episodes are paginated for better performance
- **Error Handling**: Graceful fallback to mock data if RSS feed is unavailable
- **Loading States**: Visual feedback during data fetching

### RSS Feed Source:
- **URL**: https://feeds.buzzsprout.com/1737669.rss
- **Data Extracted**: Episode title, description, publication date, duration, and audio URL
- **CORS Handling**: Uses a CORS proxy to avoid cross-origin issues

### Implementation Details:
- **Service**: `src/services/rssService.ts` - Handles RSS feed fetching and parsing
- **Component**: `src/views/EpisodesPage.tsx` - Displays episodes with search and pagination
- **Fallback**: Mock data is provided if RSS feed is unavailable


## Next Steps

1. Navigate to your project:
   ```bash
   cd "D:\Dev\Web Dev\808s-podcast"
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view your app!

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [TypeScript documentation](https://www.typescriptlang.org/)
