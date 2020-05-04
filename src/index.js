function importAll(resolve) {
  const paths = resolve.keys();
  console.log(paths);
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.js$|\.scss$/));
