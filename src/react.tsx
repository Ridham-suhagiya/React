import { cloneDeep, find, get, isEmpty, isEqual, isNumber, isString, isUndefined } from "lodash";
import { setAttributes } from "./utilts";
import { HTML_TAGS } from "./constants";

const React = () => {
    const h: any = [];
    let idx = 0;
    const cleanUpFuns: any = {};
    const componentStack: any = [];
    let componentCallbacks: any = {};
    let renderComponentStack: any = [];
    let appComponentId = "main-app-component";
    const componentRenderFuncs: any = {};
    const componentHasRendered: any = {};
    const componentIdxCount:any =  {};


    let getVirtualDom: any;
    let virtualDom: any = {}

    const createElement = (tag: HTML_TAGS, props: any, ...children: any) => {
        return {
            tag,
            props: {
                ...props,
                children
            },
        };
    }

    const _getCurrentComponentId = () => {
        return componentStack[componentStack.length - 1];
    }

    const useState = (initialValue: any): any => {
        const stateIndex = idx;
        h[stateIndex] = h[stateIndex] ?? initialValue;
        const currentComponentId = _getCurrentComponentId();
        const setState = (value: any) => {
            if (typeof value === "function") {
                h[stateIndex] = value(h[stateIndex]);
            } else {
                h[stateIndex] = value;
            }
            if (!componentHasRendered[currentComponentId] && !renderComponentStack.includes(currentComponentId)) {
                renderComponentStack.push(currentComponentId);
            } else if (componentHasRendered[currentComponentId]) {
                renderApp(currentComponentId);
            }
        }
        idx += 1;
        return [h[stateIndex], setState];
    }

    const useEffect = (cb: () => void, listOfDependencis: any[]) => {
        const hookIdx = idx;
        const componentId = _getCurrentComponentId();
        const oldListoDependencies = h[hookIdx];
        if (isUndefined(h[hookIdx]) || (oldListoDependencies && listOfDependencis.some((d: any, i: number) => !isEqual(d, oldListoDependencies[i])))) {
            h[hookIdx] = listOfDependencis;
            if (componentId) {
                componentCallbacks[componentId] ? componentCallbacks[componentId].push(cb) : componentCallbacks[componentId] = [cb];
            }
        }
        idx += 1;
    }

    const render = (vd: any, parentNode?: HTMLElement | null): any => {
        if (isEmpty(vd)) {
            return;
        }
        const props = cloneDeep(vd.props) ?? {};
        const tag = get(vd, "tag");
        const children = get(vd, "props.children", []);
        delete props.children;
        let ele: HTMLElement = document.createElement(tag);
        ele = setAttributes(ele, props);
        if (parentNode) {
            parentNode.appendChild(ele);
        }

        children.map((child: any) => {
            if (isString(child)) {
                const node = document.createTextNode(child);
                ele.appendChild(node);
            } else if (typeof child !== "function"){
                render(child, ele);
            }
        })
        return ele;
    }


    const _compareAndUpdateDoms = (root: HTMLElement | Element, newVd: any, oldVd: any, index: number = 0): any | null => {
        const newVdProps = { ...newVd?.props };
        delete newVdProps.children;
        const oldVdProps = { ...oldVd?.props };
        delete oldVdProps.children;
        if ((isEmpty(oldVd) || !oldVd) && newVd && root) {
            root.appendChild(render(newVd))
        }
        else if (!newVd && oldVd && root) {
            if (root.children[index]) {
                const componentId = get(oldVd, "props.data-component-id");
                _runAllCleanUps(componentId);
                root.removeChild(root.children[index]);
            }
        }
        else if (newVd && oldVd && (((typeof newVd !== typeof oldVd)) || (newVd.tag !== oldVd.tag))) {
            root.children[index].replaceWith(render(newVd))
        }
        else if ((isString(newVd) || isNumber(newVd)) && (newVd !== oldVd)) {
            root.innerHTML = `${newVd}`;
        } else if (!isEqual(oldVdProps, newVdProps)) {
            if (root) {
                setAttributes(root.children[index] as HTMLElement, newVdProps);
            }
        } else {
            const currentElement = root.children[index] as HTMLElement;
            if (!currentElement) return;

            const lenghtOfNewChildren = get(newVd, "props.children", []).length;
            const lenghtOOldfChildren = get(oldVd, "props.children", []).length;
            const lenghtOfChildren = lenghtOfNewChildren > lenghtOOldfChildren ? lenghtOfNewChildren : lenghtOOldfChildren;

            for (let i = 0; i < lenghtOfChildren; i++) {
                const newVdChild = newVd.props.children[i];
                const oldVdChild = oldVd.props.children[i];
                if (typeof root === "object") {
                    _compareAndUpdateDoms(currentElement, newVdChild, oldVdChild, i)
                }
            }
        }

    }


    const renderApp = (componentId: string) => {
        const root = document.getElementById("root");
        renderComponentStack = [];
        idx = componentIdxCount[componentId];
        let newComponentVd = cloneDeep(virtualDom);
        console.log(newComponentVd, "this is hitneno", componentId);
        newComponentVd = iterateThroughtTheTreeAndExcuteComponent(newComponentVd, componentId, componentId);         
        if (root) {
            _compareAndUpdateDoms(root, newComponentVd, virtualDom);
        }
        virtualDom = newComponentVd;
    }

    // const _stichNewVdIntoOldVd = (oldVd: any, newVd: any, currComponentId: string) => {
    //     const componentId = get(oldVd, "props.data-component-id")
    //     if (!oldVd) {
    //         oldVd = newVd
    //     }
    //     else if (componentId === currComponentId) {
    //         oldVd = newVd
    //     } else {
    //         const props = get(oldVd, "props", []);
    //         const children = get(props, "children");
    //         for (let i in children) {
    //             _stichNewVdIntoOldVd(children[i], newVd, currComponentId)
    //         }
    //     }
    //     return oldVd
    // }

    const _runAllCallbacksForTheComponent = (componentId: string): void => {
        const _runAllCallbacks = (callbacks: (() => any)[], key: string) => {
            callbacks.map((cb: () => any) => {
                if (cb) {
                    const cleanUps = cb();
                    cleanUps && (cleanUpFuns[key] ? cleanUpFuns[key].push(cleanUps) : cleanUpFuns[key] = [cleanUps]);
                }
            })
        }
        _runAllCallbacks(componentCallbacks[componentId] ?? [], componentId)
        componentCallbacks = {}
    }

    const _runAllCleanUps = (componentId: string) => cleanUpFuns[componentId]?.map((cu: () => void) => cu && cu())


    const mount = (vd: any) => {
        getVirtualDom = get(vd, "componentFunc");
        componentStack.push(get(vd, "componentId"));
        componentIdxCount[appComponentId] = 0;
        renderApp(appComponentId);
    }

    const iterateThroughtTheTreeAndExcuteComponent = (currentTree: any, currComponentId: string, searchComponentId: string) => {
        componentHasRendered[currComponentId] = false;
        if (isEmpty(currentTree) && !isString(currentTree) && currentTree){
            currentTree = getVirtualDom();
        }
        const props = get(currentTree, "props", []);
        const children = get(props, "children");
        for (let i in children) {
            const childComponentId = get(children[i], "componentId", get(children[i], "props.componentId"));
            const componentFunc = get(children[i], "componentFunc");
            if (componentFunc) {
                componentStack.push(childComponentId);
                componentRenderFuncs[childComponentId] = componentFunc;
                componentIdxCount[childComponentId] = idx;
                children[i] = componentFunc()
            } else if ((childComponentId === searchComponentId) && childComponentId) {
                const renderFunc = componentRenderFuncs[searchComponentId];
                componentStack.push(searchComponentId);
                children[i] = renderFunc();
            }
            iterateThroughtTheTreeAndExcuteComponent(children[i], childComponentId, searchComponentId)
        }

        currComponentId && _runAllCallbacksForTheComponent(currComponentId);
        // if (renderComponentStack.includes(currComponentId) && currComponentId) renderApp(currComponentId);
        componentHasRendered[currComponentId] = true;
        componentStack.pop();
        return currentTree
    }
    return {
        createElement,
        render,
        useState,
        renderApp,
        mount,
        useEffect
    }
}

export default React;

