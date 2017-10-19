export function wrongSceneComponentError(componentName) {
    return `Expected 'Scene' but instead got '${componentName}'. Please use Navigator component Scene for scene declarations.`;
};

export function noNavigatorError(componentName) {
    return `No navigator passed to TabNavigator`;
};
