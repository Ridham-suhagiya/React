import React from "./react";
import Layout from "./components/layout/layout";

export const PortfolioApp = () => {
    const { createElement, mount } = React;

    const APP = () => {
        return createElement("div", null, { componentFunc: Layout, componentId: "layout-component" });
    };

    mount({ componentFunc: APP, componentId: "main-app-component" });
};

PortfolioApp();
