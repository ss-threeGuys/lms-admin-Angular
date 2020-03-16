import { NotBlank } from '../service/validator';

export default 
[
    { field: 'name',    header: 'Name',     type: 'string', validator: [NotBlank] },
    { field: 'address', header: 'Address',  type: 'string'},
    { field: 'phone',   header: 'Phone',    type: 'string'},
];