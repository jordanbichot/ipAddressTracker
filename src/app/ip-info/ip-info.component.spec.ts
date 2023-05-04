import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpInfoComponent } from './ip-info.component';

describe('IpInfoComponent', () => {
  let component: IpInfoComponent;
  let fixture: ComponentFixture<IpInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
