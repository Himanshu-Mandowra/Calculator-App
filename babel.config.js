module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      
      // If you use react-native-reanimated, it MUST be the last plugin
      // 'react-native-reanimated/plugin', 
    ]
  };
};