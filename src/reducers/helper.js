export const db = {
    '1' : {
        id: 1,
        parentPath: '0',
        value: 'name',
        deleted: false,
        children: {
            '2' : {
                id: 2,
                parentPath: '0.1',
                value: 'name2',
                deleted: false,
                children: {
                    '7': {
                        id: 7,
                        parentPath: '0.1.2',
                        value: 'name7',
                        deleted: false,
                        children: {
                            '9': {
                                id: 9,
                                parentPath: '0.1.2.7',
                                value: 'name9',
                                deleted: false,
                                children: {
                                    '10': {
                                        id: 10,
                                        parentPath: '0.1.2.7.9',
                                        value: 'name10',
                                        deleted: false,
                                        children: {
                                            '12': {
                                                id: 12,
                                                parentPath: '0.1.2.7.9.10',
                                                value: 'name12',
                                                deleted: false,
                                                children: {}
                                            }
                                        }
                                    },
                                    '11': {
                                        id: 11,
                                        parentPath: '0.1.2.7.9',
                                        value: 'name11',
                                        deleted: false,
                                        children: {}
                                    }
                                }
                            }
                        }
                    },
                    '8': {
                        id: 8,
                        parentPath: '0.1.2',
                        value: 'name8',
                        deleted: false,
                        children: {}
                    }
                }
            },
            '3': {
                id: 3,
                parentPath: '0.1',
                value: 'name3',
                deleted: false,
                children: {
                    '4': {
                        id: 4,
                        parentPath: '0.1.3',
                        value: 'name4',
                        deleted: false,
                        children: {
                            '5': {
                                id: 5,
                                parentPath: '0.1.3.4',
                                value: 'name5',
                                deleted: false,
                                children: {
                                    '6': {
                                        id: 6,
                                        parentPath: '0.1.3.4.5',
                                        value: 'name6',
                                        deleted: false,
                                        children: {}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


// dataBase: {
//     id: '1',
//         value: 'name',
//         deleted: false,
//         children: [
//         {
//             id: '1.2',
//             value: 'name2',
//             deleted: true,
//             children: []
//         },
//         {
//             id: '1.3',
//             value: 'name3',
//             deleted: false,
//             children: [
//                 {
//                     id: '1.3.4',
//                     value: 'name4',
//                     deleted: false,
//                     children: [
//                         {
//                             id: '1.3.4.5',
//                             value: 'name2',
//                             deleted: false,
//                             children: []
//                         },
//                     ]
//                 }
//             ]
//         }
//     ]
// },