module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "react-app",               // includes react & react-hooks rules
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // your custom rules here
  },
};
