"use strict";

import { expect } from 'vitest'

describe('Function object, NFE', () => {
  it('should bind function be diferent from original function', () => {
    function say() {
      return this.name
    }

    const binded = say.bind({ name: 'valter' });

    expect(binded).not.toEqual(say);
  });

  it('should ignore value based as this when using new', () => {
    function original () {
      return {
        name: 'valter'
      }
    }
    
    const bind = original.bind({age: 28})

    expect(new bind().age).toBe(undefined);
  });

  it('should be possible to bind more than on time', () => {
    function Point (x, y) {
      return [x,y];
    }
    
    const bind1 = Point.bind(null, 0)
    const bind2 = bind1.bind(null, 1);

    expect(bind2()).toEqual([0,1]);
  });
  it('should lost static methods from class binding', () => {
    class Point {
      static toName = 'Point'
    }
    
    const Bind = Point.bind(null);

    expect(Point.toName).toBe('Point');
    expect(Bind.toName).toBe(undefined)
  });
  it('should this be overwrite', () => {
    function Over() {
      this.a = 10
      return { a: 12, b: 10 };
    }

    expect(new Over()).toEqual({ a: 12, b: 10 })
  });
  it('should be arrow function be auto-bound', () => {
    function first() {
      const arrow = () => this;

      return arrow;
    }

    expect(first.call({a: 1})()).toEqual({a: 1 })
  });
  it('should binded not have prototype', () => {
    function first() {}

    const binded = first.bind(null);

    expect(first).toHaveProperty('prototype');
    expect(binded).not.toHaveProperty('prototype');
  });
});
