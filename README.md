# Ultimate I18n JS 🤯

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fb4rtaz%2Fultimate-i18n-js%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/b4rtaz/ultimate-i18n-js/goto?ref=main) [![License: MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](/LICENSE) [![View this project on NPM](https://img.shields.io/npm/v/ultimate-i18n-js.svg)](https://npmjs.org/package/ultimate-i18n-js) [![Twitter: b4rtaz](https://img.shields.io/twitter/follow/b4rtaz.svg?style=social)](https://twitter.com/b4rtaz)

Ultimate internationalization framework for web applications. 

* Super simple & easy.
* Less than 1KB (minified and gziped).
* 0 dependencies.
* SEO friendly (default language will be indexed).
* Automatic a user's language detection.
* It remembers a language change (uses local storage).
* JavaScript / TypeScript support.
* Support all modern browsers (it uses the [MutationObserver](https://caniuse.com/mutationobserver) internally).

#### 🤩 Online Examples

* [Basic](https://b4rtaz.github.io/ultimate-i18n-js/examples/static-web-app/basic.html)
* [Create Element](https://b4rtaz.github.io/ultimate-i18n-js/examples/static-web-app/create-element.html)
* [Document Write](https://b4rtaz.github.io/ultimate-i18n-js/examples/static-web-app/document-write.html)
* [Dynamic Text](https://b4rtaz.github.io/ultimate-i18n-js/examples/static-web-app/dynamic-text.html)
* [Late Setup](https://b4rtaz.github.io/ultimate-i18n-js/examples/static-web-app/late-setup.html)

## 🚀 Use with Static HTML Web App

Set your default language code in the `html` tag.

```html
<html lang="en">
```

Add this library as **the first script** in your `<head>` section.

```html
<head>
   <script src="https://cdn.jsdelivr.net/npm/ultimate-i18n-js@0.0.1/lib/index.min.js"></script>
   ...
</head>
```

That's it! 🤯 Now you can add language attributes to any element on your page.

```html
<body>
  <h1
    i18n-pl="Witaj świecie"
    i18n-es="Hola Mundo">
    Hello World <!-- Your default language (en) -->
  </h1>
````

To change language call the `set` function.

```js
UltimateI18n.set('es');
```

```html
<button onclick="UltimateI18n.set('en');">EN</button>
<button onclick="UltimateI18n.set('es');">ES</button>
<button onclick="UltimateI18n.set('pl');">PL</button>
```

➡ Check [examples for static HTML web apps](examples/static-web-app)

## 🚀 Use with Module Bundler

Install this package.

`npm install ultimate-i18n-js`

Set your default language code in the `html` tag.

```html
<html lang="en">
```

Call the `setup` method before your app start.

```ts
import * as UltimateI18n from 'ultimate-i18n-js';

UltimateI18n.setup();
```

That's it! 🤯 Now you can add dynamicaly content to your app.

```ts
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('placeholder').innerHTML = `
    <span
      i18n-pl="Kocham czerwony"
      i18n-es="Amo el rojo">
      I love red
    </span>
  `;
});
```

To change language call the `set` function.

```js
UltimateI18n.set('es');
```

➡ Check [examples for Webpack apps](examples/webpack-app)

## ⚒ API

* `UltimateI18n.set('es')` - Changes the current language.
* `UltimateI18n.get()` - Read the current language.
* `UltimateI18n.setup()` - Initialize the framework. This step is required only for a late setup.
* `UltimateI18n.isSupported` - Returns `true` if the framework is enabled, otherwise `false`.

## 👷‍♂️ TODO

React and Angular is not supported yet.

The dynamic attribute change is not supported yet. The below code currently doesn't work properly.

```js
const season = document.getElementById('season');
season.innerHtml = 'Summer';
season.setAttribute('i18n-pl', 'Lato');
season.setAttribute('i18n-es', 'El verano');
```

Use the below approach instead. Basically you need to replace a whole element.

```js
document.getElementById('seasonContainer').innerHTML = `
   <h2
      i18n-pl="Lato"
      i18n-es="El verano">
      Summer
   </h2>`;
```

Or:

```js
const newSeason = document.createElement('h2');
newSeason.innerHtml = 'Summer';
newSeason.setAttribute('i18n-pl', 'Lato');
newSeason.setAttribute('i18n-es', 'El verano');

oldSeason.replaceWith(newSeason);
```

## 💡 License

This project is released under the MIT license.
