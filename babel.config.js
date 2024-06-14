module.exports = function(api) {
  api.cache(true);
  const presets =[
    'babel-preset-expo'
  ]
  const plugins = [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "alias": {
          "assets": "./src/assets"
        }
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};
