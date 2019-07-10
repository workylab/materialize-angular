import {  cloneObject } from './clone-object.util';

describe('cloneObject', () => {
  it('should copy and object with all properties', () => {
    const a = [1, 2, 3];
    const b = cloneObject(a);

    expect(a).toEqual(b);
    expect(a.length).toEqual(b.length);
    expect(a[0]).toEqual(b[0]);
    expect(a[1]).toEqual(b[1]);
    expect(a[2]).toEqual(b[2]);
  });

  it('should be inmmutable', () => {
    const a = {a:1, b:0};
    const b = cloneObject(a);

    expect(a).toEqual(b);
    expect(Object.keys(a)).toEqual(Object.keys(b));
    expect(a.a).toEqual(b.a);
    expect(a.b).toEqual(b.b);

    a.a = 3;

    expect(a.a).not.toEqual(b.a);
  });

  it('should be null when the object is undefined', () => {
    expect(cloneObject(undefined)).toBeNull();
  })

  it('should be null when object is null', () => {
    expect(cloneObject(null)).toBeNull();
  });
});
