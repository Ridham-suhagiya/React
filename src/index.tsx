import { createElement, mount } from "./react";
import Layout from "./components/layout/layout";

const APP = () => {
    return createElement("div", null, { componentFunc: Layout, componentId: "layout-component" });
};

mount({ componentFunc: APP, componentId: "main-app-component" });
