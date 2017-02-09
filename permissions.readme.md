<p style="text-align: justify;">
On this root directory there is a file <code>permissions.json</code> with variables which define the authorized permissions to do actions on the app by the
authenticated user.

In order to configure the app for fitting the api provider specifications. You can modify the next vars shown on <code>permissions.json</code> on the table shown below.
All field are optionals as well as this file (though is recommended to keep it along with the others files on the project root directory)
</p>

<p>
<table style="border: 1px solid;">
    <thead>
        <th style="width: 18%; border: 1px solid;">Variable</th>
        <th style="width: 67%; border: 1px solid;">Description</th>
        <th style="width: 15%; border: 1px solid;">Default value</th>
    </thead>
    <tbody>
        <tr>
            <td colspan="3" style="text-align: center; font-style: italic;"><small>User</small></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>MANAGE_USER</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for managing users</td>
            <td style="border: 1px solid;"><code>MANAGE_USER</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>CREATE_USER</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for creating users</td>
            <td style="border: 1px solid;"><code>CREATE_USER</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>READ_USER</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for reading users' data</td>
            <td style="border: 1px solid;"><code>READ_USER</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>READ_ALL_USER</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for reading all users' data</td>
            <td style="border: 1px solid;"><code>READ_ALL_USER</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>UPDATE_USER</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for updating users</td>
            <td style="border: 1px solid;"><code>UPDATE_USER</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>DELETE_USER</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for deleting users' data</td>
            <td style="border: 1px solid;"><code>DELETE_USER</code></td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: center; font-style: italic;"><small>Role</small></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>MANAGE_ROLE</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for managing roles</td>
            <td style="border: 1px solid;"><code>MANAGE_ROLE</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>CREATE_ROLE</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for creating roles</td>
            <td style="border: 1px solid;"><code>CREATE_ROLE</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>READ_ROLE</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for reading roles' data</td>
            <td style="border: 1px solid;"><code>READ_ROLE</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>READ_ALL_ROLE</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for reading all roles' data</td>
            <td style="border: 1px solid;"><code>READ_ALL_ROLE</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>UPDATE_ROLE</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for updating roles' data</td>
            <td style="border: 1px solid;"><code>UPDATE_ROLE</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>DELETE_ROLE</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for deleting roles</td>
            <td style="border: 1px solid;"><code>DELETE_ROLE</code></td>
        </tr>
        <tr><td colspan="3"></td></tr>
        <tr>
            <td colspan="3" style="text-align: center; font-style: italic;"><small>Permissions</small></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>MANAGE_PERMISSION</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for managing permissions</td>
            <td style="border: 1px solid;"><code>MANAGE_PERMISSION</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>CREATE_PERMISSION</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for creating permissions</td>
            <td style="border: 1px solid;"><code>CREATE_PERMISSION</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>READ_PERMISSION</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for reading permissions' data</td>
            <td style="border: 1px solid;"><code>READ_PERMISSION</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>UPDATE_PERMISSION</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for updating permissions data</td>
            <td style="border: 1px solid;"><code>UPDATE_PERMISSION</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>DELETE_PERMISSION</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for deleting permissions' data</td>
            <td style="border: 1px solid;"><code>DELETE_PERMISSION</code></td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: center; font-style: italic;"><small>Owned entity</small></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>MANAGE_OWNED_ENTITY</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for managing owned entities' data</td>
            <td style="border: 1px solid;"><code>MANAGE_OWNED_ENTITY</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>CREATE_OWNED_ENTITY</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for creating owned entities' data</td>
            <td style="border: 1px solid;"><code>CREATE_OWNED_ENTITY</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>READ_OWNED_ENTITY</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for reading owned entities' data</td>
            <td style="border: 1px solid;"><code>READ_OWNED_ENTITY</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>READ_ALL_OWNED_ENTITY</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for reading all owned entities' data</td>
            <td style="border: 1px solid;"><code>READ_ALL_OWNED_ENTITY</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>UPDATE_OWNED_ENTITY</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for updating owned entities' data</td>
            <td style="border: 1px solid;"><code>UPDATE_OWNED_ENTITY</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>DELETE_OWNED_ENTITY</code></td>
            <td style="border: 1px solid;"><code>String</code> that indicates the permission which allows actions for deleting owned entities' data</td>
            <td style="border: 1px solid;"><code>DELETE_OWNED_ENTITY</code></td>
        </tr>
    <tbody>
</table>
</p>