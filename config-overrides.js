const { override, addLessLoader, fixBabelImports } = require("customize-cra");
const { getThemeVariables } = require("antd/dist/theme");

let themeVar = getThemeVariables({
  dark: true, // Enable dark mode
  compact: false, // Enable compact mode
});
themeVar = {
  ...themeVar,
};

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      modifyVars: themeVar,
      javascriptEnabled: true,
    },
  })
);
