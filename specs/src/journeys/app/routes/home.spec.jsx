import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from 'journeys/app/routes/home';

jest.mock('utilities/inline-image-require');

describe('Execute <Home />  component', () => {
    let component;

    const state = {
        appStateReducer: {}
    };

    const store = {
        getState: () => (state),
        dispatch: x => x,
        subscribe: x => x
    };

    beforeEach(() => {
        component = shallow(<Home store={store} />);
    });

    it('Should exist', () => {
        expect(component).toBeTruthy();
    });

    it('Should render h1', () => {
        expect(component.dive().find('h1').at(0)).toHaveLength(1);
    });

});
