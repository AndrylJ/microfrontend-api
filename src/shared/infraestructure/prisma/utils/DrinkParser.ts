import { Drink } from '@drink/domain/models/Drink'
import { DrinkId } from '@drink/domain/models/DrinkId'
import { DrinkImage } from '@drink/domain/models/DrinkImage'
import { DrinkIngredient } from '@drink/domain/models/DrinkIngredient'
import { DrinkIngredientId } from '@drink/domain/models/DrinkIngredientId'
import { DrinkRecipeViews } from '@drink/domain/models/DrinkRecipeViews'
import { DrinkSlug } from '@drink/domain/models/DrinkSlug'
import { DrinkStep } from '@drink/domain/models/DrinkStep'
import { DrinkType } from '@drink/domain/models/DrinkType'
import { DrinkTypeId } from '@drink/domain/models/DrinkTypeId'
import { DrinkUtensil } from '@drink/domain/models/DrinkUtensil'
import { IngredientImage } from '@drink/domain/models/IngredientImage'
import { Measure } from '@drink/domain/models/Measure'
import { MeasureId } from '@drink/domain/models/MeasureId'
import { DrinkStatus } from '@drink/domain/types/DrinkStatus'
import {
  Drink as PrismaDrink,
  DrinkType as PrismaDrinkType,
  Ingredient as PrismaIngredient,
  IngredientsOnDrinks,
  Measure as PrismaMeasure,
  Step as PrismaStep,
  Utensil as PrismaUtensil,
  UtensilsOnDrinks
} from '@prisma/client'
import { UtensilId } from '@shared/domain/models/UtensilId'
import { UtensilImage } from '@shared/domain/models/UtensilImage'

export type PrismaDrinkDetail = PrismaDrink & {
  drinkType?: PrismaDrinkType | null
  steps?: PrismaStep[]
  ingredients?: (IngredientsOnDrinks & {
    ingredient?: PrismaIngredient
    measure?: PrismaMeasure
  })[]
  utensils?: (UtensilsOnDrinks & {
    utensil: PrismaUtensil
  })[]
}
  
export class DrinkParser {
  public static parse(drink: PrismaDrinkDetail) {
    const drinkIngredients = drink?.ingredients?.reduce((prev, drinkIngredient) => {
      const measure = drinkIngredient.measure
      const ingredient = drinkIngredient.ingredient
      if (ingredient) {
        const measureModel = measure
          ? new Measure(
            new MeasureId(measure.id),
            measure.name,
            measure.abbreviation
          )
          : undefined
        
        prev.push(new DrinkIngredient(
          new DrinkIngredientId(ingredient.id),
          ingredient.name,
          drinkIngredient.quantity.toNumber(),
          drinkIngredient.order,
          drinkIngredient.required,
          measureModel,
          ingredient.image_url ? new IngredientImage(
            ingredient.image_url,
            ingredient.image_slug ?? undefined
          ) : undefined
        ))
      }
      return prev
    }, [] as DrinkIngredient[])
        
    const drinkUtensils = drink?.utensils?.map(({ utensil }) => (
      new DrinkUtensil(
        new UtensilId(utensil.id),
        utensil.name,
        utensil.image_url ? new UtensilImage(
          utensil.image_url,
          utensil.image_slug ?? undefined
        ) : undefined
      )
    ))
        
    const drinkSteps = drink.steps?.map(step => new DrinkStep(step.id, step.description))
        
    return new Drink({
      id: new DrinkId(drink.id),
      name: drink.name,
      status: drink.status as DrinkStatus,
      description: drink.description ?? undefined,
      image: drink.image_url ? new DrinkImage(drink.image_url, drink.image_slug ?? undefined) : undefined,
      recipeViews: new DrinkRecipeViews(drink.recipe_views),
      slug: new DrinkSlug(drink.slug ?? drink.name),
      ingredients: drinkIngredients,
      utensils: drinkUtensils,
      steps: drinkSteps,
      drinkType: drink.drinkType
        ? new DrinkType(
          new DrinkTypeId(drink.drinkType.id),
          drink.drinkType.name
        )
        : undefined,
      createdAt: drink.created_at,
      updatedAt: drink.updated_at,
      deletedAt: drink.deleted_at ?? undefined,
    })
  }
}
