'use server';
import { modifyNewPages, Page } from '@/app/lib/pagesTools';
interface RequestOptions {
  method: string;
  headers: {};
  body?: string;
  redirect?: RequestRedirect | undefined;
}
// grab all pages from origin portal
export const getAllPages = async (token: string, sitePage: boolean) => {
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
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unknown error occurred');
    }
  }
};

// add pages to destination portal
export const addPages = async (
  token: string,
  pages: Page[],
  sitePage: boolean
) => {
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
  try {
    const response = await fetch(
      `https://api.hubapi.com/cms/v3/pages/${pageType}/batch/create`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`Oh No! status: ${response.status}`);
    }
    const message = await response.text();
    return message;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unknown error occurred');
    }
  }
};

// copy pages from one portal to another
export async function copyCmsPages(prevState: any, formData: FormData) {
  const tokenOne = formData.get('fromPortal') as string;
  const tokenTwo = formData.get('toPortal') as string;
  const allDraft = formData.get('allDraft') ? true : false;
  const sitePage = formData.get('sitePage') ? true : false;

  const data = await getAllPages(tokenOne, sitePage);
  if (data) {
    const modifiedData = modifyNewPages(data.results, allDraft);
    const message = await addPages(tokenTwo, modifiedData, sitePage);
    return message
      ? { message: 'success', error: '' }
      : {
          error: 'There was a problem with your request, check console',
          message: '',
        };
  } else {
    return {
      error: 'There was a problem with your request, check console',
      message: '',
    };
  }
}

// copy pages from one portal to another
export async function addCmsPages(prevState: any, formData: FormData) {
  const token = formData.get('portalKey') as string;
  const allDraft = formData.get('allDraft') ? true : false;
  const data = formData.get('data') as any;
  const parsedData = JSON.parse(data);
  const sitePage = formData.get('sitePage') === 'true' ? true : false;
  const modifiedData = modifyNewPages(parsedData, allDraft);
  const message = await addPages(token, modifiedData, sitePage);

  return message
    ? { message: 'success', error: '' }
    : {
        error: 'There was a problem with your request, check console',
        message: '',
      };
}
