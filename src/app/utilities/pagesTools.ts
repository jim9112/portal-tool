export interface Page {
  archivedAt?: string;
  state: string;
  publishImmediately: boolean;
}
// Remove the archivedAt property from the page object and set the state to 'DRAFT' if allDraft is true
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
