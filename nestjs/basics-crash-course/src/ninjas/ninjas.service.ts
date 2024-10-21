import { Injectable } from '@nestjs/common';
import { Weapon } from 'src/types/weapons';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    {
      id: 0,
      name: 'Isaac',
      weapon: 'dagger',
    },
    {
      id: 1,
      name: 'João',
      weapon: 'kunai',
    },
    {
      id: 2,
      name: 'Iury',
      weapon: 'katana',
    },
  ];

  getNinjas(weapon?: Weapon) {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinjaById(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) {
      throw new Error('Ninja not found.');
    }

    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updateNinjaDto };
      }

      return ninja;
    });

    return this.getNinjaById(id);
  }

  deleteNinja(id: number) {
    const ninjaToBeRemoved = this.getNinjaById(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    if (!ninjaToBeRemoved) {
      throw new Error('Ninja to be removed not found.');
    }

    return ninjaToBeRemoved;
  }
}
