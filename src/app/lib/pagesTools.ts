export interface Page {
  archivedAt?: string;
  state: string;
  publishImmediately: boolean;
}

export const modifyNewPages = (pageList: Page[], allDraft: boolean): Page[] => {
  const modifiedData = pageList?.map((page: Page) => {
    const pageCopy: Page = { ...page };
    delete pageCopy.archivedAt;
    if (allDraft) {
      pageCopy.state = 'DRAFT';
    }
    return pageCopy;
  });
  return modifiedData;
};
