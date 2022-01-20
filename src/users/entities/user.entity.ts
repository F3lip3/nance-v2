import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  COMMON = 'COMMON'
}

registerEnumType(UserStatus, {
  name: 'UserStatus'
});

registerEnumType(UserRole, {
  name: 'UserRole'
});

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => UserStatus)
  status: UserStatus;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
