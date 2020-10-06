import prismic from 'prismic-javascript';

export const apiEndpoint = "https://gocommerce.cdn.prismic.io/api/v2";

export const client = (req = null) => {
  const options = req ? {req} : null;

  return prismic.client(apiEndpoint, options);
}