import { getRecipe } from "@/lib/data";

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
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const id = params.id;

  const recipe = await getRecipe(id);

  return (
    <Card className="flex flex-col justify-between max-w-xl">
      <CardHeader className="flex-row gap-4 items-center">
        <Avatar className="rounded-lg w-40 h-28">
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
        <Link href="/">
          <Button>Go Back</Button>
        </Link>
        {recipe.vegan && <Badge variant="secondary">VEGAN</Badge>}
      </CardFooter>
    </Card>
  );
}
