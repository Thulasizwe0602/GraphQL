import React from 'react';
import { List, Datagrid, TextField, EmailField  } from 'react-admin';
import UrlField from './UrlField';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.city" />
            <TextField source="phone" />
            <UrlField  source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);