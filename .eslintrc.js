module.exports = {
    "env": {
        "mocha": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            2,
            "never"
        ],
        "no-console": ["error", {
            "allow": ["warn", "error"]
        }]
    }
};