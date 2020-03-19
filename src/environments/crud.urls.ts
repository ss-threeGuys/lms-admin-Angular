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
    },
    branches: { url: "/branches" },


    author: '/authors',
    book : '/books',

    genre : {
        create:     { url: '/genres', param:{} },
        retrieve:   { url: '/genres', param:{} },
        update:     { url: '/genres/:id', param: {id:'_id'} },
        delete:     { url: '/genres/:id', param: {id:'_id'} } 
    },

    borrower : {
        create:     { url: '/borrowers', param:{} },
        retrieve:   { url: '/borrowers', param:{} },
        update:     { url: '/borrowers/:id', param: {id:'_id'} },
        delete:     { url: '/borrowers/:id', param: {id:'_id'} } 
    }

    
}
