export const uploadFile = async (
  token: string,
  url: string,
  folderName: string,
  imageName: string
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const raw = JSON.stringify({
    name: imageName,
    duplicateValidationStrategy: 'NONE',
    overwrite: true,
    folderPath: folderName,
    access: 'PUBLIC_INDEXABLE',
    duplicateValidationScope: 'ENTIRE_PORTAL',
    url: url,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow' as RequestRedirect,
  };
  try {
    const response = await fetch(
      'https://api.hubapi.com/files/v3/files/import-from-url/async',
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`Oh No! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
};

export const uploadStatus = async (token: string, uploadId: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow' as RequestRedirect,
  };
  try {
    const response = await fetch(
      `https://api-na1.hubspot.com/files/v3/files/import-from-url/async/tasks/${uploadId}/status`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`Oh No! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
};
export const copyAllFiles = async (url: string) => {
  let imgUrl = url;
  if (!url.includes('htt')) {
    imgUrl = `https:${url}`;
  }
  return imgUrl;
  // get the portal keys and date
  // send the download request
  // check to see the status of the download
  // return the new url of the image
};
