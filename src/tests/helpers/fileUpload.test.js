import { fileUpload } from "../../helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'da1etvpxo',
    api_key: '356656488375724',
    api_secret: 'p8Ax6OzfG-9zh8gCIgudk1sIn9U',
    secure: true
})


describe('Pruebas en fileUpload', () => { 
    test('debe subir archivo correctamente a cloudinary', async() => { 
        const imgURL = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';
        
        const resp = await fetch( imgURL );
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');


        const segments = url.split('/');

        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        await cloudinary.api.delete_resources([ 'journal/'+imageId ]);
     })

     test('debe retornar null', async() => { 

        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );

        expect(  url ).toBe(null);
     })
 })