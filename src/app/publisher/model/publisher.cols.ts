
export default 
[
    { field: 'name', header: 'Name', validator: (x) => (x.toString().trim() != '') },
    { field: 'address', header: 'Address' },
    { field: 'phone', header: 'Phone' },
];