import React from 'react';
import { shallow, mount } from 'enzyme';
import InlineImage from 'components/block/inline-image';

jest.mock('components/pattern/inline-image');

describe('Execute <InlineImage /> component', () => {
    let component;
    const mockProps = {
        alt: 'alt text',
        src: 'imgSrc',
        width: '100',
        height: '100',
        className: 'img-class'
    };
    const {alt, src, width, height, className} = mockProps;

    beforeEach(() => {
        component = shallow(<InlineImage
            alt={alt}
            src={src}
            width={width}
            height={height}
            className={className}
        />);
    });

    it('Should exist', () => {
        expect(component).toBeTruthy();
    });

    it('Should render image element with all provided values from props', () => {
        expect(component.find('img')).toBeTruthy();
        expect(component.find('img').hasClass(className)).toBeTruthy();
        expect(component.find('img').prop('src')).toContain(src);
        expect(component.find('img').prop('alt')).toContain(alt);
        expect(component.find('img').prop('width')).toContain(width);
        expect(component.find('img').prop('height')).toContain(height);
    });

});
