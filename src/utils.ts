type AttributeHandler = (ele: HTMLElement, value: any, key?: string) => void;

const attributeHandlers: { [key: string]: AttributeHandler } = {
    className: (ele, value) => {
        ele.className = value as string;
    },
    style: (ele, value) => {
        if (value) {
            for (const [styleKey, styleValue] of Object.entries(value)) {
                ele.style[styleKey as any] = styleValue as string;
            }
        }
    },
    default: (ele, value, key) => {
        ele.setAttribute(key as string, value as string);
    }
};

export const setAttributes = (ele: HTMLElement, props: any) => {
    // Remove old event listeners if they exist
    const oldProps = (ele as any)._props || {};
    for (const [key, value] of Object.entries(oldProps)) {
        if (key.startsWith("on")) {
            const eventName = key.slice(2).toLowerCase();
            ele.removeEventListener(eventName === "change" ? "input" : eventName, value as any);
        }
    }

    for (const [key, value] of Object.entries(props)) {
        if (key.startsWith("on")) {
            const eventName = key.slice(2).toLowerCase();
            ele.addEventListener(eventName === "change" ? "input" : eventName, value as any);
        } else if (key === "value") {
            // Handle different form elements
            if (ele instanceof HTMLInputElement) {
                ele.value = value as string;
                ele.setAttribute("value", value as string);
                
                // Make read-only if no onChange
                if (!props.onChange) {
                    ele.addEventListener('input', (e) => {
                        e.preventDefault();
                        ele.value = value as string;
                    });
                }
            } else if (ele instanceof HTMLTextAreaElement) {
                ele.value = value as string;
                if (!props.onChange) {
                    ele.addEventListener('input', (e) => {
                        e.preventDefault();
                        ele.value = value as string;
                    });
                }
            } else if (ele instanceof HTMLSelectElement) {
                ele.value = value as string;
                if (!props.onChange) {
                    ele.addEventListener('change', (e) => {
                        e.preventDefault();
                        ele.value = value as string;
                    });
                }
            }
        } else if (key === "checked" && ele instanceof HTMLInputElement) {
            // Handle checkbox and radio
            ele.checked = value as boolean;
            if (!props.onChange) {
                ele.addEventListener('change', (e) => {
                    e.preventDefault();
                    ele.checked = value as boolean;
                });
            }
        } else {
            (attributeHandlers[key] || attributeHandlers.default)(ele, value, key);
        }
    }

    // Store new props for future cleanup
    (ele as any)._props = props;
    return ele;
};