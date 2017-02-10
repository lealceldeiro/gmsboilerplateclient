<p style="text-align: justify;">
On this root directory there must be a file <code>vars.json</code> with all needed
variables for getting the app running and up. <span style="font-style: italic;">(If it is not present the app won't run)</span>

In order to configure the app for fitting the api provider specifications. You can modify the next vars shown on <code>vars.json</code> on the table shown below.
Optionals fields are marked with the <span style="font-style: italic;">[optional]</span> word. The rest of them are mandatory, and, if no value is supplied, the default value will be used instead.
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
            <td colspan="3" style="text-align: center; font-style: italic;"><small>Variables used for making request to the api</small></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>base_url_req</code></td>
            <td style="border: 1px solid;">Server base url for requesting services</td>
            <td style="border: 1px solid;"><code>http://127.0.0.1/gmsboilerplate</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>api_relative_url_req</code></td>
            <td style="border: 1px solid;">Relative url for requesting services</td>
            <td style="border: 1px solid;"><code>/api/</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>header_auth_token_req</code></td>
            <td style="border: 1px solid;">Variable for sending the auth token on every request is performed</td>
            <td style="border: 1px solid;"><code>Authorization</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>header_un_auth_token_req</code></td>
            <td style="border: 1px solid;">Variable for sending the un-authentication token in the logout request</td>
            <td style="border: 1px solid;"><code>X-Auth-Token</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>header_auth_bearer_req</code> <strong><small>[optional]</small></strong></td>
            <td style="border: 1px solid;">Variable which represents the string at the beginning of the auth token request header(bearer type)</td>
            <td style="border: 1px solid;"><code>Bearer</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>auth_new_token_requester_req</code></td>
            <td style="border: 1px solid;">Variable in which you will indicate the name of the var for indicating the type for requesting a new token</td>
            <td style="border: 1px solid;"><code>grant_type</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>auth_login_user_req</code></td>
            <td style="border: 1px solid;">Variable for sending the auth username when doing login</td>
            <td style="border: 1px solid;"><code>usrnm</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>auth_login_password_req</code></td>
            <td style="border: 1px solid;">Variable for sending the auth password when doing login</td>
            <td style="border: 1px solid;"><code>pswrd</code></td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: center; font-style: italic;"><small>Variable used for making requests to the api and receiving data from it</small></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>item_refresh_token_req_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate the access refresh token</td>
            <td style="border: 1px solid;"><code>refresh_token</code></td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: center; font-style: italic;"><small>Variables used for receiving data from the api</small></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>success_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate whether the action was successful or not</td>
            <td style="border: 1px solid;"><code>success</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>error_message_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate an error message</td>
            <td style="border: 1px solid;"><code>errorMessage</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>success_message_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate a success message</td>
            <td style="border: 1px solid;"><code>successMessage</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>total_count_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate a total count of elements</td>
            <td style="border: 1px solid;"><code>total</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>items_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate a list of items</td>
            <td style="border: 1px solid;"><code>items</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>item_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate the access token</td>
            <td style="border: 1px solid;"><code>item</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>item_token_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate the access token</td>
            <td style="border: 1px solid;"><code>access_token</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>auth_user_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate the access username <small style="font-style: italic;">(just logged)</small></td>
            <td style="border: 1px solid;"><code>username</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>auth_permissions_resp</code></td>
            <td style="border: 1px solid;">Variable in which your api response will indicate the <small style="font-style: italic;">(just logged)</small> username's permissions</td>
            <td style="border: 1px solid;"><code>permissions</code></td>
        </tr>
        <tr>
            <td style="border: 1px solid;"><code>unauthorized_code_resp</code></td>
            <td style="border: 1px solid;">Response code sent by server when request is unauthorized</td>
            <td style="border: 1px solid;"><code>401</code></td>
        </tr>
    <tbody>
</table>
</p>