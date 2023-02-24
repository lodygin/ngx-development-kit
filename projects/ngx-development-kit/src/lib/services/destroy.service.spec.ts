import { DestroyService } from './destroy.service';

describe('DestroyService', () => {
  let service: DestroyService;

  beforeEach(() => {
    service = new DestroyService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call next when destroyed', () => {
    const spy = spyOn(service, 'next');
    service.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should call complete when destroyed', () => {
    const spy = spyOn(service, 'complete');
    service.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
