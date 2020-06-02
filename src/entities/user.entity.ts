import { AbstractEntity } from './abtract-entity';
import { Entity, Column, BeforeInsert, JoinTable, ManyToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude, classToPlain } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @ManyToMany(
    type => UserEntity,
    user => user.following,
  )
  @JoinTable()
  followers: UserEntity[];

  @ManyToMany(
    type => UserEntity,
    user => user.followers,
  )
  following: UserEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attemp: string) {
    return await bcrypt.compare(attemp, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }

  toFollowing(user?: UserEntity) {
    let following = null;
    if (user) {
      following = this.followers.includes(user);
    }
    const profile: any = this.toJSON();

    delete profile.followers;

    return { ...profile, following };
  }
}
