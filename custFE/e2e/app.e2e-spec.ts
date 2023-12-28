import { CustFEPage } from './app.po';

describe('cust-fe App', function() {
  let page: CustFEPage;

  beforeEach(() => {
    page = new CustFEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
