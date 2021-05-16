module.exports = {
    configureWebpack: {
        // Webpack configuration applied to web builds and the electron renderer process
    },
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: 'app/index.js',
            mainProcessWatch: ['app/*.js',"app/*/*.js"],
            preload: "app/preload.js",
            builderOptions: {
                win: {
                    icon: "build/icons/icon.ico",
                    extraResources:[
                        {
                            from:"./sounds/",
                            to:"./sounds/",
                            "filter": ["**/*"]
                        }
                    ],
                    extraFiles:[
                        {
                            from:"./build/icons/icon.png",
                            to:"./resources/assets/icon.png",
                        }
                    ],

                },
                appId:"com.lordjoo.prayerfirst",
            },
        },
    },
}
  