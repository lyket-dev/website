// import destroy from 'ducks/session/destroy';
// import { rawSwitchEnvironment } from 'ducks/session';
// import { getUser, getRoles, getEnvironments } from 'api/dato';
// import { getAccessibleEnvironments } from 'components/sub/EnvironmentsPane';
// // TODO
// export default function logoutOnInvalidAuthHeader() {
//   return next => action => {
//     if (
//       action.payload &&
//       action.payload.error &&
//       action.payload.error.data &&
//       Array.isArray(action.payload.error.data)
//     ) {
//       const errors = action.payload.error.data;
//
//       const invalidAuthHeader = errors.some(error => {
//         return (
//           error.attributes &&
//           (error.attributes.code === 'INVALID_AUTHORIZATION_HEADER' ||
//             error.attributes.code === 'INSUFFICIENT_PERMISSIONS')
//         );
//       });
//
//       if (invalidAuthHeader) {
//         const returnValue = next(destroy());
//         document.location.href = '/';
//         return returnValue;
//       }
//
//       const invalidEnvironment = errors.some(error => {
//         return (
//           error.attributes && error.attributes.code === 'INVALID_ENVIRONMENT'
//         );
//       });
//
//       if (invalidEnvironment) {
//         Promise.all([getUser('me'), getRoles(), getEnvironments()])
//           .then(([{ data: user }, { data: roles }, { data: environments }]) => {
//             let environment = null;
//
//             if (user.type === 'account') {
//               /* eslint-disable promise/no-callback-in-promise */
//               next(rawSwitchEnvironment(environment));
//               document.location.href = '/';
//               return true;
//             }
//
//             const roleId = user.relationships.role.data.id;
//
//             const currentRole = roles.find(r => r.id === roleId);
//
//             const accessibleEnvs = getAccessibleEnvironments(
//               environments,
//               currentRole,
//             );
//
//             if (accessibleEnvs.length === 0) {
//               alert(
//                 "Your role doesn't have access to any environment! Contact the system administrator to solve the issue!",
//               );
//               next(destroy());
//               document.location.href = '/';
//               return true;
//             }
//
//             const primaryEnvIfAccessible = accessibleEnvs.find(
//               env => env.meta.primary,
//             );
//
//             environment = primaryEnvIfAccessible
//               ? primaryEnvIfAccessible.id
//               : accessibleEnvs[0].id;
//
//             next(rawSwitchEnvironment(environment));
//             document.location.href = '/';
//
//             return true;
//           })
//           .catch(() => {
//             // NOP
//           });
//
//         return { type: 'logoutOnInvalidAuthHeader/null' };
//       }
//     }
//
//     return next(action);
//   };
// }
