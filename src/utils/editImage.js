export default async (src, { messages }) => {
  await import(
    /* webpackChunkName: "dokastyle" */
    'react-doka/style.css'
  );

  const Doka = await import(
    /* webpackChunkName: "doka" */
    'react-doka'
  );

  const dokaMessages = Object.entries(messages)
    .filter(entry => entry[0].startsWith('imageEditor'))
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key.replace(/^imageEditor\./, '')]: value,
      }),
      {},
    );

  Doka.setOptions(dokaMessages);

  return new Promise(resolve => {
    const doka = Doka.create({
      src,
      outputType: 'image/png',
      outputQuality: 94,
      cropZoomTimeout: 2000,
      cropShowSize: true,
      cropAspectRatioOptions: [
        {
          label: 'Free',
          value: null,
        },
        {
          label: 'Portrait',
          value: 1.5,
        },
        {
          label: 'Square',
          value: '1:1',
        },
        {
          label: 'Landscape',
          value: 0.75,
        },
      ],
      onclose: () => {
        Doka.destroy(doka);
        resolve(null);
      },
      onloaderror: () => {
        Doka.destroy(doka);
        resolve(null);
      },
      onconfirm: output => {
        Doka.destroy(doka);
        resolve(output.file);
      },
    });
  });
};
