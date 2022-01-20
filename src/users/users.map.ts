import { User, UserRole, UserStatus } from '@prisma/client';
import {
  User as UserEntity,
  UserRole as UserRoleEntity,
  UserStatus as UserStatusEntity
} from './entities/user.entity';

export class UsersMap {
  static map(user: User): UserEntity {
    return {
      ...user,
      status: this.mapUserStatus(user.status),
      role: this.mapUserRole(user.role)
    };
  }

  static mapUserStatus(status: UserStatus): UserStatusEntity {
    switch (status) {
      case 'ACTIVE':
        return UserStatusEntity.ACTIVE;
      case 'REMOVED':
        return UserStatusEntity.REMOVED;
    }
  }

  static mapUserRole(role: UserRole): UserRoleEntity {
    switch (role) {
      case 'ADMIN':
        return UserRoleEntity.ADMIN;
      case 'COMMON':
        return UserRoleEntity.COMMON;
    }
  }
}
