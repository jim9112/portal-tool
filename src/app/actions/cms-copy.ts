'use server';
interface RequestOptions {
  method: string;
  headers: {};
  body?: string;
  redirect?: RequestRedirect | undefined;
}
// To do: single page options
export const getAllPages = async (
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
  const response = await fetch(
    `https://api.hubapi.com/cms/v3/pages/${pageType}`,
    requestOptions
  );
  const data = await response.json();
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
  return modifiedData;
};

export const addPages = async (token: string, pages: [], sitePage: boolean) => {
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

export async function copyCmsPages(formData: FormData) {
  const tokenOne: any = formData.get('fromPortal');
  const tokenTwo: any = formData.get('toPortal');
  const allDraft = formData.get('allDraft') ? true : false;
  const sitePage = formData.get('sitePage') ? true : false;

  const data = await getAllPages(tokenOne, allDraft, sitePage);
  const message = await addPages(tokenTwo, data, sitePage);
  console.log(message);
}
