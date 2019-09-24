import React from 'react';

import { Blog } from './blog';
import { Login } from './login';


const providers = [<Blog.Provider />, <Login.Provider />];

const Store = ({ children: initial }) => 
    providers.reduce(
        (children, parent) => React.cloneElement(parent, { children }),
        initial
    )

export { Store, Blog, Login }

