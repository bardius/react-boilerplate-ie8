import configureStore from 'store/configure-store';
import { ActionTypes } from 'constants';

jest.mock('store/initial-state');
jest.mock('reducers/app-state-reducer');

describe('Configure Store Helper', () => {
    it('Should return a Redux store', () => {
        const store = configureStore();
        expect(store).toBeDefined();
    })
});
