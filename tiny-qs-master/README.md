# tiny-qs
A tiny query string serialization/deserialization plugin. It can be used as an AMD/CommonJS module.

## Usage

```js
// Parse
qs.parse('foo=Foo&num=42'); // { foo: 'Foo', num: '42' }
qs('foo=Foo&num=42'); // { foo: 'Foo', num: '42' }

// Stringify
qs.stringify({ foo: 'Foo', num: 42 }); // 'foo=Foo&num=42'
qs({ foo: 'Foo', num: 42 }); // 'foo=Foo&num=42'
```

## Installation

**NPM**

```bash
npm install tiny-qs
```

## APIs

### qs.parse(string, decode)

**Also: qs(string, decode)**

Parse the query string `string`. By default, the `decodeURIComponent` is used to decode the key/value. If the second parameter `decode` is `false`, no decoding method will be applied. Also, you can pass your decoding function as the second parameter, which will be used to decode the key/value string.

### qs.stringify(object, encode)

**Also: qs(object, encode)**

Stringify the `object`. By default, the `encodeURIComponent` is used to encode the key/value. If the second parameter `encode` is `false`, no encoding method will be applied. Also, you can pass your encoding function as the second parameter, which will be used to encode the key/value.

### qs()

Parse the current location query string and return.

## License

MIT.
