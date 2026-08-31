import { calculateDailyNoiseExposure } from '../src/lib/daily-noise-exposure.mjs';

type Equal<Actual, Expected> =
  (<Value>() => Value extends Actual ? 1 : 2) extends
  (<Value>() => Value extends Expected ? 1 : 2) ? true : false;
type Assert<Condition extends true> = Condition;

type Category = ReturnType<typeof calculateDailyNoiseExposure>['category'];
export type DailyNoiseExposureCategoryContract = Assert<Equal<Category, 'below-lower' | 'lower' | 'upper'>>;
