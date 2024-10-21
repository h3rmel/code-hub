// #region Imports

import { IMeal } from '@/types/meal';

import MealItem from './meal-item';
import classes from './meals-grid.module.css';

// #endregion

interface MealsGridProps {
  meals: IMeal[];
}

export function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal: IMeal) => (
        <li key={meal.slug}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
