import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  // console.log(JSON.stringify(user));
  if (options && options.role) {
    const roles = [].concat(options.role);
    Roles.addUsersToRoles( user._id, roles );
    user.roles = roles;
  }
  if (options && options.profile) {
    user.profile = options.profile;
  }
  return user;
});

Accounts.validateNewUser((user) => {
  // console.log(JSON.stringify(user));
  return true;
});