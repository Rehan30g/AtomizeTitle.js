# AtomizeTitle.js ⚛️

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![Built with JavaScript](https://img.shields.io/badge/Built_with-JavaScript-yellow?style=flat&logo=javascript)



A lightweight JavaScript module to create stunning, futuristic text animations. Atomize.js brings your titles to life with a magnetic 'puzzle-solve' effect where letters assemble themselves right before your eyes.

![Atomize.js Demo](https://github.com/Rehan30g/AtomizeTitle.js/blob/main/media/preview.gif?raw=true)

---

## Why Use AtomizeTitle.js?

idk

---

## Getting Started

### Step 1: Add the HTML Container

First, add a `div` element with a unique ID to your HTML file where you want the animation to appear.

```html
<!-- This is where the magic happens! -->
<div id="animated-text"></div>
```

### Step 2: Link the Stylesheet

Next, add the stylesheet link. You can place this in your `<head>` section or right above the animation container.

```html
<!-- Link to the CSS file directly from GitHub -->
<link rel="stylesheet" href="https://raw.githubusercontent.com/Rehan30g/AtomizeTitle.js/main/style.css">
```

### Step 3: Add and Configure the Script

Finally, add the script at the bottom of your `<body>`. This is where you'll import the animator and tell it which text to display.

```html
<script type="module">
    import { FuturisticTextAnimator } from 'https://raw.githubusercontent.com/Rehan30g/AtomizeTitle.js/main/script.js';

    // Add the sentences you want to animate
    const myTexts = [
        "Welcome to *my* website",
        "This is *Atomize.js*",
        "Pretty *cool*, right?"
    ];

    // Tell the script which container to use and what text to show
    new FuturisticTextAnimator('animated-text', myTexts);
</script>
```

---

### Example: Full Page Template

If you're starting from scratch, here’s how all the pieces look together in a complete HTML file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Site</title>
    <!-- Step 2: Stylesheet -->
    <link rel="stylesheet" href="https://raw.githubusercontent.com/Rehan30g/AtomizeTitle.js/main/style.css">
</head>
<body>

    <!-- Step 1: HTML Container -->
    <div id="animated-text"></div>

    <!-- Step 3: Script -->
    <script type="module">
        import { FuturisticTextAnimator } from 'https://raw.githubusercontent.com/Rehan30g/AtomizeTitle.js/main/script.js';

        const myTexts = [
            "Welcome to *my* website",
            "This is *Atomize.js*",
            "Pretty *cool*, right?"
        ];

        new FuturisticTextAnimator('animated-text', myTexts);
    </script>

</body>
</html>
```

---

## Customization

It's super easy to make Atomize.js your own.

### Changing the Text

Just edit the `myTexts` array in your HTML file's `<script>` tag. Add as many sentences as you like.

### Highlighting Words

To make a word stand out with the hover effect, just wrap it in asterisks (`*`).

**Example:**
`"This is an *important* word"` will apply the highlight animation and hover effect to the word "important".

---

## Show Your Support

If you use this project, I'd love to see it! Give this repo a ⭐️ if you found it helpful.

### Donate me!
[![Donasi Lewat Saweria](https://img.shields.io/badge/Saweria-Donate-orange?logo=ko-fi&logoColor=white)](https://saweria.co/Rehan30g)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/paypalme/rehan30g)




---

## License

This project is open-source and available under the [MIT License](LICENSE).
