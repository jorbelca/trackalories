module.exports = {
  "plugins": ["cypress", "react"],
  "extends": ["plugin:cypress/recommended"],
  "rules": {
    "jest/expect-expect": "off"
  },
  "settings": {
    "react": {
      "version": "17.0.2"
    }
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  }

}