import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Weapon } from 'src/types/weapons';

/**
 * @see Weapon - To stay this updated.
 */
const weaponNames = ['katana', 'kunai', 'dagger', 'shuriken'];

export class CreateNinjaDto {
  @Length(3, 128, {
    message: 'The name needs to have at least 3 characters and 12 at maximum.',
  })
  name: string;
  @IsNotEmpty()
  @IsEnum([...weaponNames], {
    message: 'Please, use a correct weapon!',
  })
  weapon: Weapon;
}
