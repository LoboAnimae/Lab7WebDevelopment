module.exports = {
    mode: 'development', 
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader", "eslint-loader"]
            }
        ]
    },
    devServer: {
        overlay: true,
        port: 3000
    }
}