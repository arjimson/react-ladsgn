import React from 'react';

import { Blog } from './blog';
import { Login } from './login';
import { Error } from './error';
import { Auth } from './auth';

const providers = [<Blog.Provider />, <Login.Provider />, <Error.Provider />, <Auth.Provider /> ];

const Store = ({ children: initial }) => 
    providers.reduce(
        (children, parent) => React.cloneElement(parent, { children }),
        initial
    )

export { Store, Blog, Login, Error, Auth }

