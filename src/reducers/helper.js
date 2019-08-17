export const db = {
    '1' : {
        id: '1',
        value: 'name',
        deleted: false,
        children: {
            '1.2' : {
                id: '1.2',
                value: 'name2',
                deleted: false,
                children: []
            },
            '1.3': {
                id: '1.3',
                value: 'name3',
                deleted: false,
                children: {
                    '1.3.4': {
                        id: '1.3.4',
                        value: 'name4',
                        deleted: false,
                        children: {
                            '1.3.4.5': {
                                id: '1.3.4.5',
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