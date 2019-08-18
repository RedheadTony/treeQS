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
                children: []
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
                                value: 'name500',
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