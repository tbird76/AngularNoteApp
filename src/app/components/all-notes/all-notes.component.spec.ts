import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotesComponent } from './all-notes.component';

describe('AllNotesComponent', () => {
  let component: AllNotesComponent;
  let fixture: ComponentFixture<AllNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllNotesComponent]
    });
    fixture = TestBed.createComponent(AllNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
