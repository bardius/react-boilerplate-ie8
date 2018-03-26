import appStateReducer from 'reducers/app-state-reducer';
import * as ActionTypes from 'constants/action-types';

describe('App State reducer', () => {
    let initialState;

    const mockData = {
        startActionValue: {
            sampleItems: 'test1,test2'
        }
    };

    beforeEach(() => {
        initialState = {
            channel: 'EMEA',
            env: 'prod',
            entrypoint: '/home/part1',
            error: {
                home: null,
                part1: null,
                part2: null
            },
            isLoading: {
                home: false,
                part1: false,
                part2: false
            },
            sampleDataIds: null,
            sampleDataList: null,
            sampleData2List: null,
            sampleData3List: null
        }
    });

    describe('Received random on null action event', () => {
        it('should return unchanged state if not valid action is received', () => {
            const newState = appStateReducer();
            expect(newState).toEqual(initialState);
        })
    });

    describe('Received GET_DEMO1_ENDPOINT1_PART1 action event', () => {
        it('should return properly changed state if GET_DEMO1_ENDPOINT1_PART1 action is received', () => {
            const newState = appStateReducer(initialState, {
                type: ActionTypes.GET_DEMO1_ENDPOINT1_PART1,
                value: mockData.startActionValue
            });
            expect(newState.isLoading).toEqual({"home": true, "part1": false, "part2": false});
            expect(newState.error).toEqual({"home": '', "part1": null, "part2": null}
            );
        })
    });
});
