# Puppeteer Automated End-to-End Testing

![Puppeteer](https://img.shields.io/badge/puppeteer-v19.6.3-brightgreen) ![Node.js](https://img.shields.io/badge/node-%3E%3D%2018.0.0-blue) 

Automated end-to-end testing solution using Puppeteer, allowing you to perform actions on a webpage, capture screenshots, and verify visual consistency through image comparisons. This project is perfect for maintaining the visual integrity of your web application.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup and Usage](#setup-and-usage)
- [Testing Script](#testing-script)
- [How the Test Works](#how-the-test-works)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Automated Browser Interactions**: Perform user-like actions on web pages recorded using Chrome DevTools Recorder.
- **Visual Regression Testing**: Compare current UI screenshots against baseline images to detect visual changes.
- **Text Extraction**: Extract and log specific text elements from the webpage.
- **Easy Integration**: Simple setup and customizable script for different testing needs.

## Prerequisites

- **[Node.js](https://nodejs.org/)** (version >= 18.0.0)
- **Puppeteer**: A high-level API to control Chrome or Chromium.
- **Dependencies**: `pngjs` for handling PNG files and `pixelmatch` for image comparison.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/shrutirthr29/Puppeteer-automated-testing.git
   cd puppeteer-end-to-end-testing

2. **Install Dependencies**:

   ```bash
   npm install puppeteer pngjs pixelmatch


## Setup and Usage
1. **Record User Interactions with Chrome DevTools Recorder:**

- Open Chrome, navigate to the webpage, and open DevTools (F12 or right-click > Inspect).
- Go to the "Recorder" tab (under "More tools" if not directly visible).
- Click "Start new recording" and perform the actions you want to automate.
- Click "Stop" when done, then export the actions as a Puppeteer script.
2. **Integrate Recorded Actions:**

- Copy the recorded actions and integrate them into the provided testing script (test.js). Adjust any selectors as needed.
3. **Run the Test:**
- Save your script as test.js and run the following command to execute the test:
```bash
   node test.js
