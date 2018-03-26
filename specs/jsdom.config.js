import raf from './test-polyfills';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
import toJson from 'enzyme-to-json';
import jsdom from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

// Make functions available to test without importing
const document = jsdom.jsdom('<!doctype html><html><body><div id="app-mount" class="app"></div></body></html>');
global.document = document;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.toJson = toJson;

// Fail tests on any warnings
console.error = (message) => {
    throw new Error(message);
};

Object.defineProperty(location, 'href', {
    value: "http://localhost.unit.tests:8080",
    configurable: true,
    writable: true
});

Object.defineProperty(location, 'host', {
    value: "localhost.unit.tests",
    configurable: true,
    writable: true
});

Object.defineProperty(location, 'hostname', {
    value: "localhost.unit.tests",
    configurable: true,
    writable: true
});

Object.defineProperty(location, 'port', {
    value: 8080,
    configurable: true,
    writable: true
});

Object.defineProperty(location, 'protocol', {
    value: "http",
    configurable: true,
    writable: true
});

Object.defineProperty(location, 'pathname', {
    value: "",
    configurable: true,
    writable: true
});
