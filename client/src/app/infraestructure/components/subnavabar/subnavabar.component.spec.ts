import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnavabarComponent } from './subnavabar.component';

describe('SubnavabarComponent', () => {
  let component: SubnavabarComponent;
  let fixture: ComponentFixture<SubnavabarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubnavabarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubnavabarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
