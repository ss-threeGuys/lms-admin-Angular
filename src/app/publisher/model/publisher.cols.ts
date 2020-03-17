import { Validators } from '@angular/forms';

export default 
[
    { field: 'name',    header: 'Name',     type: 'string', 
            defaultValue: '', validator: [Validators.required, Validators.minLength(1)] },
    { field: 'address', header: 'Address',  type: 'string'},
    { field: 'phone',   header: 'Phone',    type: 'string'},
];