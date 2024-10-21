import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getRecipes } from "@/lib/data";

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <section className="grid grid-cols-3 gap-8">
      {recipes.map((recipe: Recipe) => (
        <Card key={recipe.id} className="flex flex-col justify-between">
          <CardHeader className="flex-row gap-4 items-center">
            <Avatar>
              <AvatarImage
                src={`/img/${recipe.image}`}
                alt={`${recipe.title}'s image`}
              />
              <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{recipe.title}</CardTitle>
              <CardDescription>{recipe.time} mins to cook.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p>{recipe.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-end">
            <Link href={`/recipe/${recipe.id}`}>
              <Button>View Recipe</Button>
            </Link>
            {recipe.vegan && <Badge variant="secondary">VEGAN</Badge>}
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
