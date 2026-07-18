import type { PermissionKeys } from './permission';

/**
 * Returns `true` if the user holds **at least one** of the required permissions.
 *
 * Usage (not wired up yet – call from a component or hook once auth is ready):
 *   const canView = hasPermission(userPermissions, [PermissionKeys.BILLING_VIEW]);
 *
 * @param userPermissions - The flat array of permission keys the current user holds.
 * @param required        - One or more permission keys that grant access.
 */
export const hasPermission = (
  userPermissions: readonly PermissionKeys[],
  required: readonly PermissionKeys[],
): boolean => {
  if (required.length === 0) return true;
  return required.some((perm) => userPermissions.includes(perm));
};
