async function uploadMedia({ file, T }) {
  const {
    data: { media_id_string: mediaIdString }
  } = await T.post('media/upload', {
    media_data: file.buffer.toString('base64')
  });

  const metaParams = {
    alt_text: { text: file.originalname },
    media_id: mediaIdString
  };

  const { data } = await T.post('media/metadata/create', metaParams);

  return { ...data, mediaIdString };
}

module.exports = uploadMedia;
