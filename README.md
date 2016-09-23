# wdi-project-2

- Users can create account, sign in and sign out.
- Guest & normal users are able to browse products.
- Admin & super users are able to add/edit products.
- Admin & super users are able to update inventory.

#### Background
- Products belong to different brands.
- Each brand can have many products.
- Each product can have many variants.

##### Registering account
1. Client side form validation checks for completion before user submission
    - Valid email format
    - Name is entered
    - Password is at least 8 characters
    - Password matches
2. Server side validation
    - Create account only if email does not exist in the database (or if it does, it is not an active account)
    - Password hashing before storing in user table

##### Signing in
1. Email is case-insensitive
2. Password is case-sensitive
3. Sign in allowed only if password(hash) matches database password(hash)

##### Adding products - only for super/admin users
1. Create new brand only if brand does not exist.
2. Create new product only if product does not exist.
3. Create new variant only if variant does not exist.
4. Needs to be user friendly -> Page does not keep reloading and flow is intuitive
5. User can see if product is already added through the textbox suggestions to avoid adding same product by different users with slight naming habits

##### Update inventory - only for super/admin users
1. Allows mass updating

##### Editing products
1. Not done

Access it at http://leeyihui-wdi-project-2.herokuapp.com/
