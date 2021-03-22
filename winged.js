module.exports = {
  projectName: "fabric-demo",
  target: "web",
  packageManager: "yarn",
  web: {},
  assetsCdnHost: "https://assets.weibanzhushou.com",
  devServer: {
    basePath: "/",
    publicPath: "/",
    outputDir: "web",
    port: 1303
  },
  studio: {
    port: 1304
  },
  build: {
    basePath: "/",
    publicPath: "/",
    outputDir: "dist"
  },
  maxFileSize: 1024,
  wxapp: {}
}
