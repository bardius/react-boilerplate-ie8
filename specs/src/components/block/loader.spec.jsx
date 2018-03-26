import React from 'react';
import { shallow, mount } from 'enzyme';
import Loader from 'components/block/loader';

jest.mock('components/pattern/inline-image');

describe('Execute <Loader /> component', () => {
    let component;

    const defaultProps = {
        text: 'Loading...',
        alt: 'Loading Icon'
    };

    const {text, alt} = defaultProps;

    beforeEach(() => {
        component = shallow(<Loader text={text} alt={alt} />);
    });

    it('Should render all elements with defined property values', () => {
        expect(component.render().find('img').first().attr('src')).toContain('spinner.gif');
        expect(component.render().find('div div').first().text()).toEqual(text);
        expect(component.render().find('img').first().attr('alt')).toEqual(alt);
        expect(component.render().find('img').first().parent().attr('aria-busy')).toBeTruthy();
    });

});
