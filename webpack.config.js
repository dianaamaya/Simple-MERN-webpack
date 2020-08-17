//in baundle it will put all our converted and compacted files 'a .min is generated'
//module uses babel loader, test files .js or .jsx

module.exports = {
    entry: "./src/app/index.js",
    output: {
        path: __dirname + "/src/public",
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    }
}