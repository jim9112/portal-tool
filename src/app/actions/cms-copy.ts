'use server';

interface RequestOptions {
  method: string;
  headers: {};
  body?: string;
  redirect?: RequestRedirect | undefined;
}
// To do: single page options
const getAllPages = async (
  token: string,
  allDraft: boolean,
  sitePage: boolean
) => {
  const pageType = sitePage ? 'site-pages' : 'landing-pages';
  const requestOptions: RequestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      `https://api.hubapi.com/cms/v3/pages/${pageType}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`Oh No! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addPages = async (token: string, pages: [], sitePage: boolean) => {
  const pageType = sitePage ? 'site-pages' : 'landing-pages';
  const raw = JSON.stringify({
    inputs: pages,
  });
  const requestOptions: RequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: raw,
    redirect: 'follow',
  };
  const response = await fetch(
    `https://api.hubapi.com/cms/v3/pages/${pageType}/batch/create`,
    requestOptions
  );
  const message = await response.text();
  return message;
};

export async function copyCmsPages(prevState: any, formData: FormData) {
  const tokenOne = formData.get('fromPortal') as string;
  const tokenTwo = formData.get('toPortal') as string;
  const allDraft = formData.get('allDraft') ? true : false;
  const sitePage = formData.get('sitePage') ? true : false;

  const data = await getAllPages(tokenOne, allDraft, sitePage);
  if (data) {
    const modifiedData = data.results.map(
      (page: {
        archivedAt: string | undefined;
        state: string;
        publishImmediately: boolean;
      }) => {
        const pageCopy = { ...page };
        delete pageCopy.archivedAt;
        if (allDraft) {
          pageCopy.state = 'DRAFT';
        }
        return pageCopy;
      }
    );
    const message = await addPages(tokenTwo, modifiedData, sitePage);
    return message
      ? { message: 'success' }
      : { error: 'There was a problem with your request, check console' };
  } else {
    return { error: 'There was a problem with your request, check console' };
  }
}
