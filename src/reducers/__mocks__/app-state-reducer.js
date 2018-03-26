const initialState = {
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
};

export default function appStateReducer(state = initialState, action = ''){
    return state;
}
