import copy from "rollup-plugin-copy";

export default [
  {
    input: "index.js",
    output: {
      file: "dist/content-script.js",
      format: "iife",
    },
    plugins: [
        copy({
            targets: [
                {
                    src: "manifest.json",
                    dest: "dist/"
                },
                {
                  src: "icons",
                  dest: "dist/"
                }
            ]
        })
    ]
  },
  {
    input: "background-script.js",
    output: [
      {
        file: "dist/background-script.js",
        format: "iife",
      }
    ],
  }
];
