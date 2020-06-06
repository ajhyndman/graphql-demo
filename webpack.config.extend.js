module.exports = (webpackConfig, env, {paths}) => {
  // TODO: Extend the webpack configuration any way you like, here.

  const oneOfRule = webpackConfig.module.rules.pop();

  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [
        ...webpackConfig.module.rules.slice(0, -1),
        {
          oneOf: [
            {
              test: /\.(graphql|gql)$/,
              exclude: /node_modules/,
              loader: require.resolve('graphql-tag/loader'),
            },
            ...oneOfRule.oneOf,
          ],
        },
      ],
    },
  };
};
