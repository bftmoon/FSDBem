function importAll(resolve) {
  const paths = resolve.keys();
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.js$|\.scss$/));
