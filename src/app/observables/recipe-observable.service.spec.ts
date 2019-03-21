import { TestBed } from '@angular/core/testing';

import { RecipeObservableService } from './recipe-observable.service';

describe('RecipeObservableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeObservableService = TestBed.get(RecipeObservableService);
    expect(service).toBeTruthy();
  });
});
