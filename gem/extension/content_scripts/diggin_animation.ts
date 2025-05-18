const WIDTH = 5;

const addCssKeyValue = ({ cssText, key, value }: { cssText: string; key: string; value: string }) => {
  const newCssText = [cssText, `${key}:${value};`].join(' ');

  return newCssText;
};

const isRemoveEnabled = true;

export const animate = ({
  //
  color,
  numInsights,
}: {
  color: string;
  numInsights: number;
}) => {
  console.log('color', color);
  console.log('numInsights', numInsights);

  const insight = generateInsightField({ color, numInsights });
  const highlight = generateHighlightField({ color });

  document.body.appendChild(highlight);
  document.body.appendChild(insight);

  setTimeout(() => {
    if (isRemoveEnabled) {
      document.body.removeChild(highlight);
      document.body.removeChild(insight);
    }
  }, 750);
};

const generateInsightField = ({ color, numInsights }: { color: string; numInsights: number }) => {
  const div = document.createElement('div');

  div.innerHTML = `${numInsights} insights collected!`;

  let cssText = '';

  /* -------------------------------------------------------------------------- */
  /*                                 positioning                                */
  /* -------------------------------------------------------------------------- */

  cssText = addCssKeyValue({
    cssText,
    key: 'position',
    value: 'fixed',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'top',
    value: '0',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'right',
    value: '0',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'padding',
    value: '8px 12px',
  });

  /* -------------------------------------------------------------------------- */
  /*                                   styling                                  */
  /* -------------------------------------------------------------------------- */

  cssText = addCssKeyValue({
    cssText,
    key: 'font-size',
    value: '12px',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'color',
    value: 'white',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'background',
    value: color,
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'border-bottom-left-radius',
    value: '4px',
  });

  div.style.cssText = cssText;

  return div;
};

const generateHighlightField = ({ color }: { color: string }) => {
  const div = document.createElement('div');

  let cssText = '';

  cssText = addCssKeyValue({
    cssText,
    key: 'position',
    value: 'fixed',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'top',
    value: '0',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'right',
    value: '0',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'bottom',
    value: '0',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'left',
    value: '0',
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'border',
    value: `${WIDTH}px solid ${color}`,
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'z-index',
    value: `9999`,
  });

  cssText = addCssKeyValue({
    cssText,
    key: 'pointer-events',
    value: `none`,
  });

  div.style.cssText = cssText;

  return div;
};
