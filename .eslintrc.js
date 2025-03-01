module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["tsconfig.json"],
    },
    plugins: ["react"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/strict-boolean-expressions": 0,
        "@typescript-eslint/no-misused-promises": 0,
        "no-console": ["error"],
        "react/prop-types": 0,
        "@typescript-eslint/restrict-template-expressions": 0,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
