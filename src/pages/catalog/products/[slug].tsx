import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { client } from '@/lib/prismic';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';

interface ProductProps {
  product: Document;
}


const AddToCartModal = dynamic(
  () => import('@/components/AddToCartModal'),
  { loading: () => <p>Loading...</p>, ssr: false}
);

export default function product({ product }: ProductProps) {
  const router = useRouter();
  

  if(router.isFallback) {
    return (
      <h3>carregando...</h3>
    );
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>
      <img src={product.data.thumbnail.url} alt="" width="300"/>
      <div dangerouslySetInnerHTML={{__html: PrismicDOM.RichText.asHtml(product.data.description)}}>
      </div>
      <p>Price: {product.data.price}</p>
    </div>
  );
}

export const getStaticPaths:GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps:GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  }
}