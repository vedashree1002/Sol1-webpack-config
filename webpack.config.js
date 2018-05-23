const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );
const precss = require( 'precss' );
const svgFragments = require( 'postcss-svg-fragments' );
const cssnano = require( 'cssnano' );
const path = require( 'path' );

module.exports = {
  entry: {
    app: [
      './app/App.js'
    ]
  },

  output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
    
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules']
  },

  module: {
    preloaders: [
      { test: /\.jsx$|\.es6$|\.js$/, loader: 'source-map', query: { presets: ['react', 'es2015'] }, exclude: /(node_modules|bower_components)/ }
    ],
    loaders: [
      { test: /\.jsx$|\.es6$|\.js$/, loader: 'babel', query: { presets: ['react', 'es2015'] }, exclude: /(node_modules|bower_components)/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
      { test: /.*\.(gif|png|jpe?g|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=5'] }
    ],

    rules: [
    {
     test: /\.(png|woff|woff2|eot|ttf)$/,  
    use: {
       loader: 'url-loader'
        options: { limit: 100000 }
     }
    },
   {
     test: /\.svg$/,
     use: {
        loader: 'svg-url-loader' || 'file-loader',
     },
   }
  ]
  },


  postcss: function() {
    return [
        autoprefixer( { browsers: ['last 2 versions'] } ),
        precss,
        svgFragments,
        cssnano,
        pxtorem( {
          propWhiteList: [] // Enables converting of all properties - default is just font sizes.
        } )
    ];
  },

  plugins: [
    new ExtractTextPlugin( 'public/styles.css', {
      allChunks: true
    } )
  ]
};