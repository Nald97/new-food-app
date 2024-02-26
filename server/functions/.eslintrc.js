module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows the use of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
  },
};
