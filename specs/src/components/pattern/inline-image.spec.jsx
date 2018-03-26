import React from 'react';
import { shallow, mount } from 'enzyme';
import InlineImagePattern from 'components/pattern/inline-image';

jest.mock('utilities/inline-image-require');

describe('Execute <InlineImage /> pattern', () => {
    let component;
    let plainComponent;

    const src = 'imgSrc';

    beforeEach(() => {
        component = mount(<img src={InlineImagePattern(src)} />);
        plainComponent = mount(<img src={InlineImagePattern()} />);
    });

    it('Should render image element with full path if path was provided', () => {
        expect(component.html()).toContain(`assets/inline/img/${src}`);
    });

    it('Should render image element with base path if no path was provided', () => {
        expect(plainComponent.html()).toContain(`assets/inline/img/`);
    });

});
