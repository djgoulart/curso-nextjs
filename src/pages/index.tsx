import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';

interface IHomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: IHomeProps) {

  return (
    <div>
      <section>
        <SEO 
        title="The best developer e-commerce!" 
        image="og.png"
        shouldExcludeTitleSuffix/>
        <Title>Recommended Products</Title>

        <ul>
          {
            recommendedProducts.map(recommendedProduct => {
              return (
                <li key={recommendedProduct.id}>
                  <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                    <a>
                      {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                    </a>
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </section>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const recommendedProducts = client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  return {
    props: {
      recommendedProducts:(await recommendedProducts).results
    }
  }
}