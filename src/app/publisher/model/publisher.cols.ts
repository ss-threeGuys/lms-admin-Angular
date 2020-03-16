
export default 
[
    { field: 'name',    header: 'Name',     type: 'string', validator: (x) => (x.toString().trim() != '') },
    { field: 'address', header: 'Address',  type: 'string'},
    { field: 'phone',   header: 'Phone',    type: 'string'},
];