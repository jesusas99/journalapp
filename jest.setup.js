// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';

require('dotenv').config({
    path: '.env'
});

// jest.mock('./src/helpers/getEnvironments', () => ({
//     getEnvironments: () => ({ ...process.env })
// }));