module.exports = {
    mode: 'development', 
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader", "eslint-loader"]
            }
        ]
    },
    devServer: {
        contentBase: 'dist', 
        port: 3000,
        overlay: true
    },
    resolve:{
        extensions: [
            '.js', 
            '.jsx'
        ]
    }
}