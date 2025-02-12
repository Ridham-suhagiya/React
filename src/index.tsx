import React from "./react";

export const APP = () => {
    const { createElement, useState, mount, useEffect } = React();

    // Test 1: Basic useEffect with Cleanup
    const Timer = () => {
        const [time, setTime] = useState(new Date().toLocaleTimeString());
        const [isRunning, setIsRunning] = useState(true);
        const [intervalTimerId, setIntervalTimerId] = useState("");
        console.log("this is the timer component")
        useEffect(() => {
            let interval: any;
            if (isRunning) {
                // interval = setInterval(() => {
                //     setTime(new Date().toLocaleTimeString());
                // }, 1000);
                // if (intervalTimerId) {
                //     setIntervalTimerId(interval)
                // }
            }

            // Cleanup function
            return () => {
                if (interval) {
                    console.log('Cleaning up timer');
                    clearInterval(interval);
                }
            };
        }, [isRunning]);

        return createElement("div", { className: "test-component", "data-component-id": "timer-component" },
            createElement("h2", null, "Test 1: useEffect with Cleanup"),
            createElement("p", null, `Current time: ${time}`),
            createElement("button", {
                onClick: () => {
                    console.log("something something")
                    clearInterval(intervalTimerId);
                    setIntervalTimerId()
                },
                className: "button"
            }, isRunning ? "Stop Timer" : "Start Timer"),
            createElement("p", { className: "effect-note" }, "Check console for effect logs")
        );
    }

    // Test 2: Multiple Effects with Different Dependencies
    const Counter = () => {
        const [count, setCount] = useState(0);
        const [isEven, setIsEven] = useState(true);
        const [countHistory, setCountHistory] = useState<number[]>([]);
        console.log(countHistory, "this is the counter");
        // Effect 1: Check if count is even
        useEffect(() => {
            console.log("event call cb before")
            setIsEven(count % 2 === 0);
            console.log("event call cb after")
        }, [count]);

        // Effect 2: Update history
        useEffect(() => {
            setCountHistory((prev: any) => [...prev, count].slice(-5));
        }, [count]);

        // Effect 3: Log when component mounts
        useEffect(() => {
            return () => console.log('Counter component will unmount');
        }, []);
        return createElement("div", { className: "test-component", "data-component-id": "counter-component" },
            createElement("h2", null, "Test 2: Multiple Effects"),
            createElement("p", null, `Count: ${count} (${isEven ? 'Even' : 'Odd'})`),
            createElement("p", null, `History: ${countHistory.join(', ')}`),
            createElement("button", {
                onClick: () => setCount((c: any) => c + 1),
                className: "button"
            }, "Increment"),
            createElement("p", { className: "effect-note" }, "Check console for effect logs")
        );
    }

    // Test 3: Effect with Async Operation and Cleanup
    const AsyncEffect = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [results, setResults] = useState<string[]>([]);
        const [status, setStatus] = useState('idle');
        useEffect(() => {
            // Skip empty searches
            if (!searchTerm.trim()) {
                setResults([]);
                return;
            }

            let isActive = true;
            setStatus('searching');

            // Simulate async search
            const timeoutId = setTimeout(() => {
                if (isActive) {
                    // Simulate search results
                    const mockResults = [
                        `${searchTerm} result 1`,
                        `${searchTerm} result 2`,
                        `${searchTerm} result 3`
                    ];
                    setResults(mockResults);
                    setStatus('done');
                }
            }, 500);

            // Cleanup function
            return () => {
                console.log(`Canceling search for: ${searchTerm}`);
                isActive = false;
                clearTimeout(timeoutId);
            };
        }, [searchTerm]);
        return createElement("div", { className: "test-component", "data-component-id": "async-effect-component" },
            createElement("h2", null, "Test 3: Async Effect with Cleanup"),
            createElement("input", {
                type: "text",
                value: searchTerm,
                onChange: (e: any) => setSearchTerm(e.target.value),
                placeholder: "Type to search..."
            }, null),
            createElement("p", { className: "status" }, `Status: ${status}`),
            createElement("ul", { className: "results-list" },
                ...results.map((result: any) =>
                    createElement("li", null, result)
                )
            ),
            createElement("p", { className: "effect-note" },
                "Type quickly to see cleanup in action (check console)")
        );
    }


    // Main App Component
    const AppComponent = () => {
        const [showTests, setShowTests] = useState(true);
        return createElement("div", { className: "app", "data-component-id": "main-app-component" },
            createElement("h1", null, "useEffect Test Cases"),
            createElement("p", { className: "test-guide" },
                "Open the browser console to see effect lifecycles in action"),
            createElement("button", {
                onClick: () => setShowTests((prev: any) => !prev),
                className: "toggle-button"
            }, showTests ? "Hide All Tests" : "Show All Tests"),
            showTests && createElement("div", { className: "test-cases" },
                { componentFunc: Timer, componentId: "timer-component" },
                { componentFunc: Counter, componentId: "counter-component" },
                { componentFunc: AsyncEffect, componentId: "async-component" },

            )
        );
    }

    mount({ componentFunc: AppComponent, componentId: "main-app-component" });
};

APP();