import { faker } from "@faker-js/faker";
import type { Menu, Permission, Role, User } from "#/entity";
import { PermissionType } from "#/enum";

// Dashboard menu for roles
export const DB_MENU: Menu[] = [
  // Dashboard group
  {
    id: "group_dashboard",
    name: "Dashboard",
    code: "dashboard",
    parentId: "",
    type: PermissionType.GROUP,
  },
  // Workbench - barcha rollar uchun umumiy
  {
    id: "workbench",
    parentId: "group_dashboard",
    name: "Workbench",
    code: "workbench",
    type: PermissionType.MENU,
    path: "/workbench",
    component: "/pages/dashboard/workbench",
  },
  // Analysis - faqat ADMIN va SUPER-ADMIN uchun
  {
    id: "analysis",
    parentId: "group_dashboard",
    name: "Analysis",
    code: "analysis",
    type: PermissionType.MENU,
    path: "/analysis",
    component: "/pages/dashboard/analysis",
    roles: ["ADMIN", "SUPER-ADMIN"],
  },
  // Teacher Dashboard
  {
    id: "teacher_dashboard",
    parentId: "group_dashboard",
    name: "Teacher Dashboard",
    code: "teacher_dashboard",
    type: PermissionType.MENU,
    path: "/teacher/dashboard",
    component: "/pages/dashboard/teacher",
    roles: ["TEACHER"],
  },
  // Parent Dashboard
  {
    id: "parent_dashboard",
    parentId: "group_dashboard",
    name: "Parent Dashboard",
    code: "parent_dashboard",
    type: PermissionType.MENU,
    path: "/parent/dashboard",
    component: "/pages/dashboard/parent",
    roles: ["PARENT"],
  },
  // User Dashboard
  {
    id: "user_dashboard",
    parentId: "group_dashboard",
    name: "User Dashboard",
    code: "user_dashboard",
    type: PermissionType.MENU,
    path: "/user/dashboard",
    component: "/pages/dashboard/user",
    roles: ["USER"],
  },
];

// Users
export const DB_USER: User[] = [
  { id: "user_admin_id", username: "admin", password: "1234", role: "ADMIN", phone: "+998900000000" },
  { id: "user_super_id", username: "super", password: "1111", role: "SUPER-ADMIN", phone: "+998910000000" },
  { id: "user_teacher_id", username: "teacher", password: "2222", role: "TEACHER", phone: "+998920000000" },
  { id: "user_parent_id", username: "parent", password: "3333", role: "PARENT", phone: "+998930000000" },
  { id: "user_user_id", username: "user", password: "4444", role: "USER", phone: "+998940000000" },
];



// Roles
export const DB_ROLE: Role[] = [
  { id: "role_admin_id", name: "admin", code: "SUPER_ADMIN" },
  { id: "role_test_id", name: "test", code: "TEST" },
];

// Permissions
export const DB_PERMISSION: Permission[] = [
  { id: "permission_create", name: "permission-create", code: "permission:create" },
  { id: "permission_read", name: "permission-read", code: "permission:read" },
  { id: "permission_update", name: "permission-update", code: "permission:update" },
  { id: "permission_delete", name: "permission-delete", code: "permission:delete" },
];

// User-Role mapping
export const DB_USER_ROLE = [
  { id: "user_admin_role_admin", userId: "user_admin_id", roleId: "role_admin_id" },
  { id: "user_test_role_test", userId: "user_test_id", roleId: "role_test_id" },
];

// Role-Permission mapping
export const DB_ROLE_PERMISSION = [
  { id: faker.string.uuid(), roleId: "role_admin_id", permissionId: "permission_create" },
  { id: faker.string.uuid(), roleId: "role_admin_id", permissionId: "permission_read" },
  { id: faker.string.uuid(), roleId: "role_admin_id", permissionId: "permission_update" },
  { id: faker.string.uuid(), roleId: "role_admin_id", permissionId: "permission_delete" },

  { id: faker.string.uuid(), roleId: "role_test_id", permissionId: "permission_read" },
  { id: faker.string.uuid(), roleId: "role_test_id", permissionId: "permission_update" },
];
