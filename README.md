# Custom React Implementation

This project is a custom implementation of React, focusing on core features like `useState`, `useEffect`, conditional rendering, and cleanup functions. The goal is to provide a deeper understanding of how React works under the hood by building a simplified version of it.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [How to Use](#how-to-use)
5. [Example](#example)
6. [Future Improvements](#future-improvements)
7. [Conclusion](#conclusion)

## Introduction

This project is an attempt to create a custom React-like library from scratch. It includes basic functionalities such as state management (`useState`), side effects (`useEffect`), and conditional rendering. The implementation is not meant to replace React but to help developers understand the inner workings of a React-like library.

## Features

- **useState**: A hook to manage state within functional components.
- **useEffect**: A hook to handle side effects, including cleanup functions.
- **Conditional Rendering**: Ability to conditionally render components based on state.
- **Component Lifecycle**: Basic lifecycle management with cleanup functions.
- **Virtual DOM**: A simple Virtual DOM implementation for efficient updates.

## Prerequisites

To use this custom React implementation, you need to follow these guidelines:

1. **Component ID**: Each component must have a unique `componentId` prop. This is essential for the library to track and manage component states and effects.
2. **JSX Structure**: The `componentId` must be present in the topmost part of the JSX structure when declaring a component.

## How to Use

1. **Clone the Repository**: Start by cloning this repository to your local machine.
2. **Install Dependencies**: Ensure you have Node.js and npm installed. Run `npm install` to install any necessary dependencies.
3. **Run the Example**: Use the provided example to understand how to create components using this custom React implementation.
4. **Create Your Own Components**: Follow the example structure to create your own components. Make sure to include the `componentId` prop in each component.

## Example

Here’s a simple example of how to use this custom React implementation:

```javascript
import React from "./react";

export const APP = () => {
    const { createElement, useState, mount, useEffect } = React();

    const Timer = () => {
        const [time, setTime] = useState(new Date().toLocaleTimeString());
        const [isRunning, setIsRunning] = useState(true);

        useEffect(() => {
            let interval: any;
            if (isRunning) {
                interval = setInterval(() => {
                    setTime(new Date().toLocaleTimeString());
                }, 1000);
            }

            return () => {
                if (interval) {
                    console.log('Cleaning up timer');
                    clearInterval(interval);
                }
            };
        }, [isRunning]);

        return createElement("div", { className: "test-component", componentId: "timer-component" },
            createElement("h2", null, "Test 1: useEffect with Cleanup"),
            createElement("p", null, `Current time: ${time}`),
            createElement("button", {
                onClick: () => setIsRunning(!isRunning),
                className: "button"
            }, isRunning ? "Stop Timer" : "Start Timer"),
            createElement("p", { className: "effect-note" }, "Check console for effect logs")
        );
    }

    const AppComponent = () => {
        const [showTests, setShowTests] = useState(true);
        return createElement("div", { className: "app", componentId: "main-app-component" },
            createElement("h1", null, "useEffect Test Cases"),
            createElement("p", { className: "test-guide" },
                "Open the browser console to see effect lifecycles in action"),
            createElement("button", {
                onClick: () => setShowTests((prev: any) => !prev),
                className: "toggle-button"
            }, showTests ? "Hide All Tests" : "Show All Tests"),
            showTests && createElement("div", { className: "test-cases" },
                { componentFunc: Timer, componentId: "timer-component" }
            )
        );
    }

    mount({ componentFunc: AppComponent, componentId: "main-app-component" });
};

APP();