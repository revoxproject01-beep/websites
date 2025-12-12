# Navigation Highlighting Feature

This document explains how the navigation highlighting feature works in the Global Business Solutions website.

## Overview

The navigation highlighting feature automatically highlights the current page link in the website's navigation menu. This helps users understand which page they are currently viewing.

## Implementation Details

### Files Involved

1. **`js/nav-highlight.js`** - Main JavaScript file that implements the highlighting logic
2. **`css/nav-highlight.css`** - CSS file with custom styles for highlighted navigation items
3. **All HTML files** - Include references to the above files

### How It Works

1. When the page loads, the JavaScript code in `nav-highlight.js` runs
2. It determines the current page by checking `window.location.pathname`
3. It finds all navigation links (`<a>` tags within `<nav>` elements)
4. It compares each link's `href` attribute with the current page
5. When a match is found, it adds appropriate CSS classes:
   - `nav-active` for main navigation links
   - `dropdown-active` for dropdown menu items

### Special Cases

- **index2.html**: Also highlights the "Home" link since it's a variant of the home page
- **Dashboard pages**: Highlights the parent "Dashboard" dropdown button when on admin or user dashboard pages

### CSS Classes

- **`.nav-active`**: Applied to main navigation links
  - Changes text color to primary color (#7e22ce)
  - Makes text bold (font-weight: 600)
  - Adds a bottom border for visual emphasis

- **`.dropdown-active`**: Applied to dropdown menu items
  - Changes background color to light blue (#eff6ff)

## Testing

To test the navigation highlighting:

1. Open any page in the website
2. Observe that the link corresponding to the current page is highlighted
3. Navigate to different pages and verify the highlighting updates correctly

A test page `nav-test.html` is included to demonstrate the feature.

## Maintenance

To modify the highlighting behavior:

1. Update `js/nav-highlight.js` for JavaScript logic changes
2. Update `css/nav-highlight.css` for styling changes
3. Ensure all HTML files include references to these files

## Troubleshooting

If highlighting is not working:

1. Check that `js/nav-highlight.js` is properly included in the page
2. Verify that `css/nav-highlight.css` is properly linked
3. Check the browser console for JavaScript errors
4. Ensure the file paths are correct