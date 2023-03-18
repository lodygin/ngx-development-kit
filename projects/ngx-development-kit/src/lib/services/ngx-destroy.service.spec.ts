import { NgxDestroyService } from './ngx-destroy.service';

describe('NgxDestroyService', () => {
  let service: NgxDestroyService;

  beforeEach(() => {
    service = new NgxDestroyService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call next when destroyed', () => {
    const spy = jest.spyOn(service, 'next');
    service.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should call complete when destroyed', () => {
    const spy = jest.spyOn(service, 'complete');
    service.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
