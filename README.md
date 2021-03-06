# Scrull

![no dependency](https://img.shields.io/badge/no-dependency-green.svg)

Making scroll-bars more attractive.

___

## Usage:

1. Include `scrull.css` ( or `scrull.min.css` ) in your markup.
2. Include `scrull.js` ( or `scrull.min.js` ) in your markup at the end of the body ( before `</body>` ).
3. Add `scrull` class to the elements you wanna to be affected by scrull.

## Example:

```
<head>

  <link rel="stylesheet" href="scrull.min.css" />

</head>

<body>

  <div class="scrull section">

    <!-- some content -->

  </div>

  <script src="scrull.min.js"></script>

</body>
```

above example will give a nice scroll-bar for all of your `.scrull` elements by default; but if you want to use smooth-scrolling function by yourself you should check `.scrullTo` method at the [API](#api) section.

## API

You've two global method to use:

1. `scrullTo`: Smooth version for native `scrollTo`. It scrolls `document.body` by default; But if you want to scroll inside some other element, it's possible by `call` or `apply` method. Example:

 ```
scrullTo.call( someAnotherElement, 25 );
```
2. `scrullIt`: The method that will fire on **.scrull** elements. You can easily make any element scrullable.
