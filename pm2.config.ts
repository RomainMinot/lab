module.exports = {
    name: "lab",
    script: "main.ts",
    interpreter: "bun",
    env: {
      PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // Add "~/.bun/bin/bun" to PATH
    },
};