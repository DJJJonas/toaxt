<h1 align="center">
  <br>
  <a href="https://djjjonas.github.io/toaxt"><img width="200" src="https://github.com/DJJJonas/toaxt/assets/48167880/1e617dcf-b6fd-4922-9a67-abf36e267d33" /></a>
  <br>
  Toaxt
</h1>
<h4 align="center">A dead simple toast library for the web.</h4>

## Installation

Inside the `src` folder, there should be a `toaxt.ts` and `toaxt.js` file.
Choose the one you want to use and copy it to your project.

## Demo

Inside the `demo` folder, there is a `main.ts` file where you can see a demonstration of this library. Also, you can access [this link](https://djjjonas.github.io/toaxt/) to see a live demo.

## Usage

Import the Toaxt class from the file you chose and instantiate it once.

```ts
import Toaxt from "/path/to/toaxt.ts";
const toaxt = new Toaxt();
```

Now you can call the `new` method whenever you want to create a new toaxt.

```ts
toaxt.new({
  text: "Hello, World!",
});
```

The Toaxt has an icon "slot", where you can insert, for example, an `<i>` or an `<svg>` to show an icon on the left side of the toaxt.

```ts
// For this example, you need the Font Awesome 4 icon library.
toaxt.new({
  text: "Hello, Icon!",
  icon: '<i class="fa fa-smile-o"></i>',
});
```

Toaxt is also customizable, so you can change the styling of the toaxt using the `style` properties. The `iconStyle`, `textStyle` and `closeStyle` properties are used to change the styling of the icon, text and close button, respectively. There is also the `style` property that can be used to change the background of the toaxt.

```ts
toaxt.new({
  text: "Hello, Styling!",
  iconStyle: {
    background: "green", // Change the background of the icon column to green.
  },
  textStyle: {
    fontSize: "1.5rem", // Change the font size of the text column to 1.5rem.
  },
  closeStyle: {
    color: "red", // Change the color of the close button to red.
  },
});
```

By default, toaxts will disappear after 6 seconds. You can change this using the `duration` property for each toaxt.

```ts
toaxt.new({
  text: "Remeber, the duration is measured in milliseconds.",
  duration: 3000, // This toaxt will disappear after 3 seconds.
});
```

Alternatively, you can change the default duration using the `toaxt.defaultDurationMS` property.

```ts
toaxt.defaultDurationMS = 2000; // Change the default duration to 2 seconds.
toaxt.new({
  text: "This toaxt will disappear after 2 seconds.",
});
```

Toaxts also have a `onClose` property that can be used to execute code when the toaxt is closed by any means.

```ts
toaxt.new({
  text: "This toaxt will log when it is closed.",
  onClose: () => {
    console.log("Toaxt closed!");
  },
});
```

The Toaxt library comes with premade styles. You can see them by using the `ToaxtStyles` object.

```ts
import { ToaxtStyles } from "/path/to/toaxt.ts";
// success, error, info, warning
toaxt.new({
  text: "This toaxt has a success background.",
  style: ToaxtStyles.success,
});

toaxt.new({
  text: "This toaxt has an error background.",
  style: ToaxtStyles.error,
});

toaxt.new({
  text: "This toaxt has an info background.",
  style: ToaxtStyles.info,
});

toaxt.new({
  text: "This toaxt has a warning background.",
});
```
