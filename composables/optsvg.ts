import { optimize } from 'svgo';

const presetDefault = [
  {
      name: 'preset-default',
      params: {
          overrides: {
              removeViewBox: false,
          },
      },
  },
  'cleanupListOfValues',
];

export const optimizeSvg = (files: Array<Files>) => {
  const optimizedSvgData = [] as Array<Files>;
  for (const file of files) {
    const svgData = optimize(file.content, { path: 'path-to.svg', plugins: presetDefault });

    optimizedSvgData.push({
      name: file.name,
      content: svgData.data,
    });
  }
  return Promise.all(optimizedSvgData);
}
