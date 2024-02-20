import { optimize } from 'svgo';

export const optimizeSvg = (files: Array<Files>) => {
  const optimizedSvgData = [] as Array<Files>;
  for (const file of files) {
    const svgData = optimize(file.content, { path: 'path-to.svg', multipass: true, plugins: [
      // {
      //   name: 'preset-default',
      //   params: {
      //     overrides: {
      //       removeViewBox: false,
      //     },
      //   },
      // },
      'convertOneStopGradients'
    ]});

    optimizedSvgData.push({
      name: file.name,
      content: svgData.data,
    });
  }
  return Promise.all(optimizedSvgData);
}
