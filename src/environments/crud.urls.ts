import Method from 'axios';

export const crudUrls = {
    baseHost: 'localhost',
    basePort: 3000,
    prefix: '/admin',

    publisher : {
        create:     { url: '/publishers', param:{} },
        retrieve:   { url: '/publishers', param:{} },
        update:     { url: '/publishers/:id', param: {id:'_id'} },
        delete:     { url: '/publishers/:id', param: {id:'_id'} } 
    }
    
}