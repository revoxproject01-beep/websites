console.log('Testing RTL toggle...');
const html = document.documentElement;
console.log('Current dir:', html.getAttribute('dir'));
html.setAttribute('dir', html.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl');
console.log('New dir:', html.getAttribute('dir'));