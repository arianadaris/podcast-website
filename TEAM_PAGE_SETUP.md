# Team Page Setup

## Overview
The team page has been successfully created with the following features:

1. **TeamPage** - Main team page displaying four PersonCard components in a horizontal line
2. **PersonCard** - Clickable card component showing person's image and name
3. **PersonPage** - Individual person detail page with bio, role, and social links
4. **Navigation** - Full navigation flow from main page → team page → individual person page

## File Structure
```
src/
├── components/
│   └── PersonCard.tsx          # Reusable person card component
├── views/
│   ├── TeamPage.tsx            # Main team page
│   └── PersonPage.tsx          # Individual person detail page
└── App.tsx                     # Updated with new routing
```

## Team Members
The current team members are:
1. **Alex Johnson** - Host & Producer
2. **Sarah Chen** - Co-Host & Music Director  
3. **Mike Rodriguez** - Technical Producer
4. **Emily Davis** - Content Strategist

## Adding Team Member Images

### Option 1: Add Images to Public Folder
1. Add team member images to `public/images/` directory
2. Name them: `person1.jpg`, `person2.jpg`, `person3.jpg`, `person4.jpg`
3. Recommended size: 400x400 pixels or larger (will be resized automatically)

### Option 2: Use Placeholder Images
The PersonCard and PersonPage components include fallback functionality:
- If an image fails to load, it will display an avatar with the person's initials
- No additional setup required

### Option 3: Use External Image URLs
Update the image paths in `TeamPage.tsx` and `PersonPage.tsx` to use external URLs:
```typescript
image: 'https://example.com/person1.jpg'
```

## Customization

### Adding New Team Members
1. Update the `teamMembers` array in `TeamPage.tsx`
2. Add corresponding data in the `personData` object in `PersonPage.tsx`
3. Add navigation logic if needed

### Styling
All components follow the existing design system:
- Blue gradient background
- Black borders and text
- Consistent spacing and typography
- Hover effects on interactive elements

## Navigation Flow
1. **Main Page** → Click "Team" → **Team Page**
2. **Team Page** → Click any PersonCard → **Person Page**
3. **Person Page** → Click "Back" → **Team Page**
4. **Team Page** → Click "Back" → **Main Page**

## Features
- ✅ Responsive design
- ✅ Image fallback handling
- ✅ Consistent styling with existing pages
- ✅ Full navigation flow
- ✅ Hover effects and animations
- ✅ Social media links for each person
- ✅ Detailed bios and roles
