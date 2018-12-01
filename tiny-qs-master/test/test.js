describe('qs.parse()', function() {

  beforeAll(function() {
    var curQueryStr = 'foo=Foo&num=42';
    var href = location.href;

    if (href.indexOf('?') === -1) {
      location.href = href + '?' + curQueryStr;
    }
  });

  it('should return a key/value object when a query string is passed', function() {
    expect(qs.parse('foo=Foo')).toEqual({ foo: 'Foo' });
    expect(qs.parse('foo=Foo&num=42')).toEqual({ foo: 'Foo', num: '42' });
    expect(qs.parse('foo=Foo&')).toEqual({ foo: 'Foo', '': '' });
  });

  it('should be an empty string value if the query pair doesn\'t contain assignment character', function() {
    expect(qs.parse('foo')).toEqual({ foo: '' });
    expect(qs.parse('foo&num=42')).toEqual({ foo: '', num: '42' });
  });

  it('should return the decoded key/value', function() {
    var string = encodeURIComponent('$foo') + '=' + encodeURIComponent('Hello, World!');

    expect(qs.parse(string)).toEqual({ '$foo': 'Hello, World!' });
  });

  it('should return the array of values if the query string contains more than one key/value of the same key', function() {
    var string = 'title=engineer&lang=c&lang=javascript&lang=php';

    expect(qs.parse(string)).toEqual({ title: 'engineer', lang: ['c', 'javascript', 'php'] });
  });

  it('should return empty string if the query string has not equal sign or value string', function() {
    var string = 'foo';

    expect(qs.parse(string)).toEqual({ foo: '' });
  });

  it('should return the undecoded key/value if the second parameter is false', function() {
    var string = encodeURIComponent('$doc') + '=' + encodeURIComponent('$(document)');
    var obj = {};
    obj[encodeURIComponent('$doc')] = encodeURIComponent('$(document)');

    expect(qs.parse(string, false)).toEqual(obj);
  });

  it('should return an object whose key/value is decoded with the specified decode function', function() {
    var encodedStr = 'marks=%u2713%20and%20%u2717';

    expect(qs.parse(encodedStr, unescape)).toEqual({ marks: '✓ and ✗' });
  });

});

describe('qs.stringify()', function() {

  it('should return the query string when an object is passed', function() {
    expect(qs.stringify({ foo: 'Foo' })).toBe('foo=Foo');

    var tester = {
      asymmetricMatch: function(actual) {
        return actual === 'foo=Foo&num=42' || actual === 'num=42&foo=Foo';
      }
    };

    expect(qs.stringify({ foo: 'Foo', num: 42 })).toEqual(tester);
  });

  it('should be converted to empty string if the value is null or undefined', function() {
    expect(qs.stringify({ foo: undefined })).toBe('foo=');
    expect(qs.stringify({ bar: null })).toBe('bar=');
  });

  it('should return the encoded query string', function() {
    var obj = { '$doc': '$(document)' };
    var str = encodeURIComponent('$doc') + '=' + encodeURIComponent('$(document)');

    expect(qs.stringify(obj)).toBe(str);
  });

  it('should return a query string containing more than one key/value of the same key if a property value is an array', function() {
    var obj = {
      lang: ['C', 'JavaScript', 'PHP']
    };

    expect(qs.stringify(obj)).toBe('lang=C&lang=JavaScript&lang=PHP');
  });

  it('should return the unencoded query string if the second parameter is false', function() {
    var obj = { '$doc': '$(document)' };
    var str = '$doc=$(document)';

    expect(qs.stringify(obj, false)).toBe(str);
  });

  it('should return a query string encoded by the specified encode function', function() {
    var obj = {
      marks: '✓ and ✗'
    };
    var str = 'marks=%u2713%20and%20%u2717';

    expect(qs.stringify(obj, escape)).toBe(str);
  });

});

describe('qs()', function() {

  it('should return a key/value object if a query string is passed', function() {
    var obj = { foo: 'Foo', num: 42 };
    var tester = {
      asymmetricMatch: function(actual) {
        return actual === 'foo=Foo&num=42' || actual === 'num=42&foo=Foo';
      }
    };

    expect(qs(obj)).toEqual(tester);
  });

  it('should return a query string if a key/value object is passed', function() {
    var str = 'foo=Foo&num=42';
    var obj = { foo: 'Foo', num: '42' };

    expect(qs(str)).toEqual(obj);
  });

  it('should return the current location query string if no parameter is passed', function() {
    var curQueryObj = { foo: 'Foo', num: '42' };

    expect(qs()).toEqual(curQueryObj);
  });

  it('should return a object with undecoded key/value if a query string and false are passed', function() {
    var string = encodeURIComponent('$doc') + '=' + encodeURIComponent('$(document)');
    var obj = {};
    obj[encodeURIComponent('$doc')] = encodeURIComponent('$(document)');

    expect(qs(string, false)).toEqual(obj);
  });

  it('should return an unencoded query string if an object and false are passed', function() {
    var obj = { '$doc': '$(document)' };
    var str = '$doc=$(document)';

    expect(qs(obj, false)).toBe(str);
  });

});
