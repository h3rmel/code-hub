// Component(s)
import Card from "../components/Card";
import CardContainer from "../components/CardContainer";
import Header from "../components/Header";
import Layout from "../components/Layout/Index";
import LoadMore from "../components/LoadMore";
import SectionTitle from "../components/SectionTitle";

// Recipes
import { recipes } from "../configs/recipes";

const Home = () => {
  return (
    <Layout title="Home">
      <>
        <Header title="Recipes" subtitle="For Ninjas" />
        <div>
          <SectionTitle title="Latest Recipes" />
          <CardContainer>
            <>
              {recipes.map(
                (recipe: {
                  id: number;
                  name: string;
                  by: string;
                  image: string;
                  time: number;
                }) => (
                  <Card
                    key={recipe.id}
                    name={recipe.name}
                    by={recipe.by}
                    image={recipe.image}
                    time={recipe.time}
                  />
                )
              )}
            </>
          </CardContainer>
          <SectionTitle title="Most Popular" />
          <CardContainer>
            <>
              {recipes.map(
                (recipe: {
                  id: number;
                  name: string;
                  by: string;
                  image: string;
                  time: number;
                }) => (
                  <Card
                    key={recipe.id}
                    name={recipe.name}
                    by={recipe.by}
                    image={recipe.image}
                    time={recipe.time}
                  />
                )
              )}
            </>
          </CardContainer>
          <LoadMore />
        </div>
      </>
    </Layout>
  );
};

export default Home;
