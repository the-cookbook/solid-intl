import withSolid from 'rollup-preset-solid';

export default withSolid({
  input: 'src/index.ts',
  output: [
    {
      file: "dist/cjs/index.cjs",
      format: "cjs"
    },
    {
      file: "dist/esm/index.js",
      format: "esm"
    }
  ],
});
